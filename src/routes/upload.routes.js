const router = require("express").Router();
const fileUpload = require("../middleware/upload/fileUpload");
const controller = require("../api/v1/upload/controllers");
const authenticate = require("../middleware/authenticate");
const uploader = require("../utils/upload/multerMemoryUploader");
const { Upload } = require("../models");
const { cloudinaryImageUploader } = require("../utils/upload/cloudinarySDK");
const config = require("../config");
const { slugify } = require("../utils/generateUniqueSlug");
const transformFileResult = require("../utils/upload/transformFileResult");
router
  .route("/files")
  .get(controller.find)
  .post(uploader.array("files"), async (req, res, next) => {
    const {
      folderName,
      width: givenFileWidth,
      height: givenFileHeight,
    } = req.body;

    const uploadedFiles = [];
    try {
      // Generate a file name with today's date and the original name
      const today = new Date();
      const { files } = req;
      for (const file of files) {
        const alternativeText = file.originalname
          .split(".")
          .shift()
          .toLowerCase();
        const fileFormat = slugify(alternativeText);
        const fileName = `${today.toISOString().slice(0, 10)}_${fileFormat}`;
        const dataB64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${dataB64}`;
        // Create a preview version of the image by resizing it
        const fileObject = {
          dataURI,
          folderName,
          allowed_formats: config.thumbnailAllowedFormats,
          fileName,
        };
        //TODO PDF preview
        if (file.mimetype.startsWith("image/")) {
          fileObject.width = givenFileWidth;
          fileObject.height = givenFileHeight;
        }
        const imageResult = await cloudinaryImageUploader(fileObject);
        const {
          asset_id,
          public_id,
          width,
          height,
          folder,
          resource_type,
          format,
          size,
          url,
        } = transformFileResult(imageResult);

        // Store the imageId in image schema
        const image = new Upload({
          caption: file.fieldname,
          alternativeText,
          asset_id,
          public_id,
          width,
          height,
          folder,
          resource_type,
          format,
          size,
          url,
        });
        const savedImage = await image.save();
        uploadedFiles.push(savedImage);
      }
      res.status(201).json({ data: uploadedFiles });
    } catch (error) {
      return next(error);
    }
  })
  .delete(controller.destroyMany);

router
  .route("/files/:id")
  .get(controller.findSingle)
  .delete(authenticate, controller.destroy);
module.exports = router;
