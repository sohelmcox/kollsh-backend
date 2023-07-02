const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const apiSpecPath = path.join(__dirname, "swagger.yaml");
const YAML = require("yamljs");
const swaggerDoc = YAML.load(apiSpecPath);
const OpenApiValidator = require("express-openapi-validator");
const swaggerUi = require("swagger-ui-express");

// use middleware
const app = express();
app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.CORS_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// openapi specification middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// openapi specification middleware
app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpecPath,
    validateRequests: true, // (default)
    // validateResponses: true, // false by default
  })
);

// use router
app.get("/items", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// handle global error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((err, _req, res, _next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
