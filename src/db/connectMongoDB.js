const mongoose = require("mongoose");
const config = require("../config");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} else {
  mongoose.connect(config.testingMongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

module.exports = mongoose;
