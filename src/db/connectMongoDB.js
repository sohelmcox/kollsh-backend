const mongoose = require("mongoose");
const config = require("../config");

const connectDB = async () => {
  await mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected");
};

module.exports = connectDB;
