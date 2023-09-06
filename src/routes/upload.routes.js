const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");

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

router.post("/files", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});
module.exports = router;
