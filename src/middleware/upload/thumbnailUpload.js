const uploader = require("../../utils/upload/multerMemoryUploader");
const { Upload } = require("../../models");
const transformImageResult = require("../../utils/upload/transformImageResult");
const config = require("../../config");
const { cloudinaryImageUploader } = require("../../utils/upload/cloudinarySDK");
const { slugify } = require("../../utils/generateUniqueSlug");
const thumbnailUpload = (folderName) => async (req, res, next) => {
  uploader.single("thumbnail")(req, res, async (err) => {
    console.log("file", req.file);

    if (err) {
      return next(err);
    }

    try {
      // Generate a file name with today's date and the original name
      const today = new Date();
      const { file } = req;
      console.log("file", file);
      const alternativeText = file.originalname
        .split(".")
        .shift()
        .toLowerCase();
      const fileFormat = slugify(alternativeText);
      const fileName = `${today.toISOString().slice(0, 10)}_${fileFormat}`;
      const dataB64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${dataB64}`;

      // Create a preview version of the image by resizing it
      const imageResult = await cloudinaryImageUploader({
        dataURI,
        folderName,
        allowed_formats: config.thumbnailAllowedFormats,
        width: config.thumbnailWidth,
        height: config.thumbnailHeight,
        crop: "fill",
        fileName,
      });

      //TODO pass and import from image service
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
      } = transformImageResult(imageResult);

      console.log("imageResult", imageResult);

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
      // set the imageId in the current req
      req.uploadedThumbnailId = savedImage._id;
      // Continue with the next middleware or route handler
      next();
    } catch (error) {
      return next(error); // Pass the error to the next middleware or error handler
    }
  });
};

module.exports = thumbnailUpload;
