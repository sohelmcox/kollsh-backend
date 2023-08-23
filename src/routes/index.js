const indexRoute = require("express").Router();
const itemRouter = require("./item.routes");
const authRouter = require("./auth.routes");
const stateRouter = require("./state.routes");
// router use.............................................

// health check
indexRoute.get("/health", (req, res) => {
  res.status(200).send("ok");
});

indexRoute.use("/auth", authRouter);
indexRoute.use("/items", itemRouter);
indexRoute.use("/states", stateRouter);

indexRoute.use("/users", (req, res) => {
  res.status(200).send("Users route");
});
module.exports = indexRoute;
