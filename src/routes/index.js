const indexRoute = require("express").Router();

// router use..............
indexRoute.get("/", (req, res) => {
  res.status(200).send("Application is running");
});
indexRoute.get("/health", (req, res) => {
  res.status(200).send("Application health is good");
});

// router use..............

indexRoute.use("/auth", () => {
  console.log("auth route");
});
indexRoute.use("/category", () => {
  console.log("category route");
});
indexRoute.use("/tag", () => {
  console.log("tag route");
});
indexRoute.use("/article", () => {
  console.log("article route");
});

module.exports = indexRoute;
