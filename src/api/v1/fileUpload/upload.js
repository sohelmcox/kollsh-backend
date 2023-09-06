const { v2: cloudinary } = require("cloudinary");
const Multer = require("multer");

cloudinary.config({
  cloud_name: "serabuy-com",
  api_key: "243918522254865",
  api_secret: "nmhYboCl65ub_QNm6fA7Rd5mxmg",
  secure: true,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});
