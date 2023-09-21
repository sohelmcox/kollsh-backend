const mongoose = require("mongoose");

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect("mongodb://localhost:27017/test-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect from the test database
  await mongoose.disconnect();
});
