const config = require("../../config");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
  // secure: true,
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
const deleteCloudinarySingleFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === "ok") {
      // console.log("File deleted successfully");
      return;
    } else {
      console.error(`Error deleting file: ${result.result}`);
    }
  } catch (error) {
    // throw error;
    console.log(error);
  }
};
const destroyManyFiles = async (publicIds) => {
  for (const publicId of publicIds) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result === "ok") {
        console.log(`File ${publicId} deleted successfully`);
      } else {
        console.log(`Error deleting file ${publicId}: ${result.result}`);
      }
    } catch (error) {
      console.log(`Error deleting file ${publicId}:`, error.message);
    }
  }
};
module.exports = {
  cloudinaryImageUploader,
  deleteCloudinarySingleFile,
  destroyManyFiles,
};
