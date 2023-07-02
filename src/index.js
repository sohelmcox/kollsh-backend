require("dotenv").config();
const http = require("http");
const app = require("./app/app");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;

// connect to database
connectDB();

const server = http.createServer(app);

// handle errors
app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// listen the app
server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", PORT);
});
