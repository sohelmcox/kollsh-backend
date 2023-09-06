const uploader = require("../fileUpload/singleUploader");

function avatarUpload(req, res, next) {
  const upload = uploader(
    "thumbnail",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!",
  );
  console.log("avatarUpload", req.files);
  // call the middleware function
  upload.single()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          msg: err.message,
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
