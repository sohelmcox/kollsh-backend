const mongoose = require("mongoose");
const config = require("../../../src/config"); // Import your configuration
const {
  connectDatabase,
  disconnectDatabase,
  setupDatabase,
} = require("./databaseSetup"); // Define database setup functions

beforeAll(async () => {
  await connectDatabase(); // Connect to the test database
});

afterAll(async () => {
  await disconnectDatabase(); // Disconnect from the test database
});

beforeEach(async () => {
  await setupDatabase(); // Set up the test database environment (drop collections, insert data, etc.)
});

module.exports = {
  disconnectDatabase,
  setupDatabase,
  connectDatabase,
};
