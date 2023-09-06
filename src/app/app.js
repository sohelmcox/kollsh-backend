require("dotenv").config();
const express = require("express");
const indexRoute = require("../routes");
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
const applyMiddleware = require("../middleware");
const {
  resetPasswordAttempt,
  resetUserEmailAttempt,
} = require("../utils/cron");
cloudinary.config({
  cloud_name: "serabuy-com",
  api_key: "243918522254865",
  api_secret: "nmhYboCl65ub_QNm6fA7Rd5mxmg",
  secure: true,
});
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}
const app = express();

// use middleware
applyMiddleware(app);

// use router
app.post("/api/v1/upload/files", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
}),
  app.use("/api/v1", indexRoute);

// cron job
resetUserEmailAttempt();
resetPasswordAttempt();
// handle global error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(err.status || 500).json({
    status: err.status,
    name: err.name,
    message: err.message,
    details: err.details,
  });
});

module.exports = app;
