const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGODB_URI;
console.log(db);
const connect = () => {
  //connection mongodb with mongoose
  return mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));
};

module.exports = connect;
