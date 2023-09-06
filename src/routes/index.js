const indexRoute = require("express").Router();
const itemRouter = require("./item.routes");
const authRouter = require("./auth.routes");
const stateRouter = require("./state.routes");
const roleRouter = require("./role.routes");
const permissionRouter = require("./permission.routes");
const uploadRouter = require("./upload.routes");
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
// router use.............................................
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

// health check
indexRoute.get("/health", (req, res) => {
  res.status(200).send("ok");
});
indexRoute.post("/upload", upload.single("my_file"), async (req, res) => {
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
}),
  indexRoute.use("/auth", authRouter);
indexRoute.use("/items", itemRouter);
indexRoute.use("/states", stateRouter);
indexRoute.use("/roles", roleRouter);
indexRoute.use("/permissions", permissionRouter);

indexRoute.use("/users", (req, res) => {
  res.status(200).send("Users route");
});

module.exports = indexRoute;
