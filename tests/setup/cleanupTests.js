const mongoose = require("mongoose");

async function cleanupTestDatabase() {
  try {
    // Drop the entire test database
    await mongoose.connection.db.dropDatabase();
    console.log("Test database cleaned up successfully");
  } catch (error) {
    console.error("Error cleaning up test database:", error);
  }
}

module.exports = cleanupTestDatabase;
