const mongoose = require("mongoose");
const config = require("../../../src/config"); // Import your configuration
const { hashing } = require("../../../src/utils");

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
  const password = hashing.generateHash("Test1234");
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
  await mongoose.connection.db.collection("users").insertMany([
    {
      name: "Ibrahim Sifat",
      username: "username",
      email: "ibsifat900@gmail.com",
      password,
      confirmed: true,
      blocked: false,
    },
  ]);
  await mongoose.connection.db.collection("roles").insertMany([
    {
      name: "user",
    },
  ]);
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
  setupDatabase,
};
