const multer = require("multer");
const config = require("../../config");

const storage = multer.memoryStorage();
const uploader = multer({
  storage: storage,
  limits: { fileSize: config.maxImageUploadSize }, // 5 MB limit, adjust as needed
  fileFilter: (req, file, cb) => {
    const allowedFormats = ["jpg", "jpeg", "png", "webp", "gif", "svg", "pdf"];
    const fileFormat = file.originalname.split(".").pop().toLowerCase();
    if (allowedFormats.includes(fileFormat)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid image/file format. Allowed formats: jpg, jpeg, png, webp, gif,svg pdf",
        ),
      );
    }
  },
});
module.exports = uploader;
