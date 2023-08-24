const http = require("http");
const app = require("./app/app");
const connect = require("./config/db");

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const connectDB = require("./db/connectMongoDB");

connectDB();
// listen the app
server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  // console.info("Server started on PORT %s.", PORT);
});
