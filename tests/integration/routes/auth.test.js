const { testBaseUrl } = require("../../../src/config");
const agent = require("../../agent");
const { findUserByEmail } = require("../../../src/lib/auth/userService");
const { createUser } = require("../../../src/lib/user");
const { User } = require("../../../src/models");
const {
  connectDatabase,
  disconnectDatabase,
  setupDatabase,
} = require("../setup/databaseSetup");

beforeAll(async () => {
  // Connect to the test database
  await connectDatabase();
});

afterAll(async () => {
  // Disconnect from the test database
  await disconnectDatabase();
});

beforeEach(async () => {
  // Set up the test database environment
  await setupDatabase();
});
describe("Login Route - Integration Test", () => {
  it("POST /login should log in a user", async () => {
    const loginData = {
      identifier: "ibsifat900@gmail.com",
      password: "Test1234",
    };

    const response = await agent
      .post(`${testBaseUrl}/auth/local/login`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200);

    // Assertions for a successful login
    expect(response.body).toHaveProperty("message", "success");
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("name", "Ibrahim Sifat");
    expect(response.body.user).toHaveProperty("username", "username");
    expect(response.body.user).toHaveProperty("email", "ibsifat900@gmail.com");
    expect(response.body.user).toHaveProperty("confirmed", true);
    expect(response.body.user).toHaveProperty("blocked", false);
  }, 15000);

  it("POST /login should handle user not found error", async () => {
    const loginData = {
      identifier: "nonexistentuser@gmail.com", // User that does not exist
      password: "Test1234",
    };

    const response = await agent
      .post(`${testBaseUrl}/auth/local/login`)
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(400);

    // Assertions for a user not found error
    expect(response.body).toHaveProperty("message", "User not found.");
  }, 15000);
});

// describe("Registration Route - Integration Test", () => {
//   it("should register a new user if they do not exist", async () => {
//     const newUser = {
//       name: "New User",
//       username: "newusera",
//       email: "newusera@example.com",
//       password: "Test1234", // You can use a test password
//     };

//     // Simulate the registration request
//     const response = await agent
//       .post(`${testBaseUrl}/auth/local/register`)
//       .send(newUser)
//       .expect("Content-Type", /json/)
//       .expect(200);

//     // Assertions for a successful registration
//     expect(response.body).toHaveProperty(
//       "message",
//       "User registered successfully",
//     );

//     // Check if the user exists in the database after registration
//     const registeredUser = await User.findOne({ email: newUser.email });
//     expect(registeredUser).toBeTruthy();
//   });

//   it("should send an error if the user already exists", async () => {
//     const existingUser = {
//       name: "Existing User",
//       username: "existinguser",
//       email: "existinguser@example.com",
//       password: await hashing.generateHash("Test1234"), // Use a hashed password
//     };

//     // Insert an existing user into the database
//     await User.create(existingUser);

//     const duplicateUser = {
//       name: "Duplicate User",
//       username: "existinguser", // Use the same username
//       email: "existinguser@example.com", // Use the same email
//       password: "Test5678", // Use a different password
//     };

//     // Simulate the registration request for the duplicate user
//     const response = await agent
//       .post(`${testBaseUrl}/auth/local/register`)
//       .send(duplicateUser)
//       .expect("Content-Type", /json/)
//       .expect(400);

//     // Assertions for an error response
//     expect(response.body).toHaveProperty("message", "User already exist");

//     // Check that the existing user is still in the database
//     const existingUserInDB = await User.findOne({ email: existingUser.email });
//     expect(existingUserInDB).toBeTruthy();
//   });
// });
