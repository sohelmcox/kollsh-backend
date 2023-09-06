const mongoose = require("mongoose");
const config = require("../../../src/config"); // Import your configuration

async function connectDatabase() {
  await mongoose.connect(config.testingMongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function disconnectDatabase() {
  await mongoose.disconnect();
}

async function setupDatabase() {
  // Clear the test database and insert sample data
  await mongoose.connection.db.dropDatabase();
  // await mongoose.connection.db.createCollection("items");
  await mongoose.connection.db.collection("items").insertMany([
    {
      name: "Item",
      description: "this is description",
      slug: "item",
      price: 100,
      released: "2023-02-26T16:37:48.244Z",
    },
    {
      name: "hello",
      description: "this is description",
      slug: "hello",
      price: 100,
      released: "2023-02-26T16:37:48.244Z",
    },
  ]);
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
  setupDatabase,
};
