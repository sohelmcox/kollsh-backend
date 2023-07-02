const http = require("http");
const app = require("./app/app");
const connect = require("./config/db");
const server = http.createServer(app);

// console.log(port);
connect();
// create server
const PORT = process.env.PORT || 4000;

// listen the app
server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on PORT %s.", PORT);
});
