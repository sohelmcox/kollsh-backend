// setup database test connection
require("../../setup/testSetup");
const request = require("supertest");
const { create: createRole } = require("../../../src/lib/role");
// const router = require("../../../src/routes/auth.routes");
const { testBaseUrl } = require("../../../src/config");
const app = require("../../setup/app");
const { hashing } = require("../../../src/utils");
const agent = require("../../agent");
const createTestUser = require("../../setup/createTestUser");
const { userRole } = require("../../testSeed/role");
const { Role, User } = require("../../../src/models");
// app.use("/", router);
const localAuthBaseURL = `${testBaseUrl}/auth/local`;
describe("Authentication Routes", () => {
  beforeEach(async () => {
    await createTestUser();
    await createRole(userRole);
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await User.deleteMany({});
    await Role.deleteMany({});
  });
  // Test the /local/register route
  it("should register a new user", async () => {
    const userData = {
      // Provide user registration data here
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    };

    const response = await agent
      .post(`${localAuthBaseURL}/register`)
      .send(userData)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(201);
    console.log(response.body);
  });

  // Test the /local/login route
  it("should log in an existing user", async () => {
    const loginData = {
      // Provide user login data here
      email: "testuser@example.com",
      password: "password123",
    };

    const response = await agent
      .post(`${localAuthBaseURL}/login`)
      .send(loginData)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);
    console.log(response);
    authToken = response.body.accessToken;
  });

  // Test other routes following a similar pattern

  // Example: Test the /email-confirmation route
  //   it("should confirm the email", async () => {
  //     // Perform any necessary setup, e.g., generate a confirmation token

  //     const response = await request(app)
  //       .get("/email-confirmation")
  //       .set("Authorization", `Bearer ${authToken}`) // Send the authentication token if required
  //       .set("Accept", "application/json")
  //       .set("Content-Type", "application/json");

  //     expect(response.statusCode).toBe(200);
  //     // Add assertions for the email confirmation route response
  //   });

  // Continue testing other routes in a similar manner

  // Don't forget to handle edge cases and error scenarios
});
