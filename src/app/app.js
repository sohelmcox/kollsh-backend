const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// use middleware
const app = express();
app.use(morgan("tiny"));
app.use(helmet());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use router
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
// handle global error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, _next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
