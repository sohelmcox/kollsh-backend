const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected");
};

module.exports = connectDB;
