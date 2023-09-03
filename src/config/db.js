const mongoose = require("mongoose");
const config = require(".");

let connectionURL = config.mongoUri;

connectionURL = connectionURL.replace("<username>", config.databaseUsername);
connectionURL = connectionURL.replace("<password>", config.databasePassword);

// connectionURL = `${connectionURL}/${config.databaseName}?${config.databaseUrlQuery}`;

// const connect = async () => {
//   await mongoose.connect(connectionURL, { dbName: config.databaseName });
//   console.log("Database connected");
// };
// connect mongodb database with mongoose in docker container mongo
const connect = async () => {
  await mongoose.connect(
    "mongodb://kollsh:thisispasswrord@localhost:27017/serabuy?retryWrites=true&w=majority",
    { dbName: config.databaseName },
  );
  console.log("Database connected");
};

module.exports = connect;
