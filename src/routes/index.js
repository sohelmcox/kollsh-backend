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

indexRoute.use("/users", (req, res) => {
  res.status(200).send("Users route");
});

module.exports = indexRoute;
