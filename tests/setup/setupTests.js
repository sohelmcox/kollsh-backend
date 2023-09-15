const mongoose = require("mongoose");
const seedTestDatabase = require("./seedTestDatabase"); // Import your seeding function
const { testingMongoUri } = require("../../src/config");
const request = require("supertest");
const app = require("../../src/app/app");
const cleanupTestDatabase = require("./cleanupTests");

// Create a global test agent
global.testAgent = request.agent(app);

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(testingMongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Seed the test database with data
  await seedTestDatabase();
});
// afterEach(async () => {
//   await cleanupTestDatabase();
// });

afterAll(async () => {
  // Disconnect from the test database after all tests have run
  //   await mongoose.connection.db.
  await mongoose.disconnect();
  await mongoose.connection.close();
});
