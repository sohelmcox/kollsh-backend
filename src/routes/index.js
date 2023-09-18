const indexRoute = require("express").Router();
const itemRouter = require("./item.routes");
const authRouter = require("./auth.routes");
const stateRouter = require("./state.routes");
const roleRouter = require("./role.routes");
const permissionRouter = require("./permission.routes");
const uploadRouter = require("./upload.routes");
const commentRouter = require("./comment.routes");
const cityRouter = require("./city.routes");
const countryRouter = require("./country.routes");
const brandRouter = require("./brand.routes");
const categoryRouter = require("./category.routes");
const subcategoryRouter = require("./subcategory.routes");
const attributeRouter = require("./attribute.routes");
const attributeValueRouter = require("./attributeValue.routes");
const userRouter = require("./user.routes");
const replayRouter = require("./replay.routes");
const metadataRouter = require("./metadata.routes");

// health check
indexRoute.get("/health", (req, res) => {
  res.status(200).send("ok");
});
indexRoute.use("/upload", uploadRouter);
indexRoute.use("/auth", authRouter);
indexRoute.use("/items", itemRouter);
indexRoute.use("/states", stateRouter);
indexRoute.use("/roles", roleRouter);
indexRoute.use("/permissions", permissionRouter);
indexRoute.use("/comments", commentRouter);
indexRoute.use("/cities", cityRouter);
indexRoute.use("/countries", countryRouter);
indexRoute.use("/brands", brandRouter);
indexRoute.use("/categories", categoryRouter);
indexRoute.use("/subcategories", subcategoryRouter);
indexRoute.use("/attributes", attributeRouter);
indexRoute.use("/attribute-values", attributeValueRouter);
indexRoute.use("/users", userRouter);
indexRoute.use("/replays", replayRouter);
indexRoute.use("/metadata", metadataRouter);

module.exports = indexRoute;
