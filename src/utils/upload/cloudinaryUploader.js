const config = require("../../config");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
  secure: true,
});

const cloudinaryImageUploader = async ({
  dataURI,
  folderName,
  allowed_formats,
  width,
  height,
  crop = "fill",
  fileName,
}) => {
  const result = await cloudinary.uploader.upload(dataURI, {
    folder: folderName,
    allowed_formats,
    transformation: {
      width,
      height,
      crop,
    },
    public_id: fileName,
  });
  return result;
};
module.exports = cloudinaryImageUploader;
