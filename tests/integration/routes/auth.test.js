// setup database test connection
require("../../setup/testSetup");
const nodemailer = require("nodemailer-mock");
const { create: createRole } = require("../../../src/lib/role");
// const router = require("../../../src/routes/auth.routes");
const { testBaseUrl, accessToken } = require("../../../src/config");
// const app = require("../../setup/app");
const { hashing } = require("../../../src/utils");
const agent = require("../../agent");
const createTestUser = require("../../setup/createTestUser");
const { userRole } = require("../../testSeed/role");
const { Role, User } = require("../../../src/models");
// app.use("/", router);
const localAuthBaseURL = `${testBaseUrl}/auth`;
// describe("Authentication Routes", () => {
//   beforeEach(async () => {
//     await createTestUser();
//     await createRole(userRole);
//   });

//   afterEach(async () => {
//     // Clean up test data after each test case
//     await User.deleteMany({});
//     await Role.deleteMany({});
//   });
//   // Test the /local/register route
//   // it("should register a new user", async () => {
//   //   const userData = {
//   //     // Provide user registration data here
//   //     username: "testuser",
//   //     email: "testuser@example.com",
//   //     password: "password123",
//   //   };

//   //   const response = await agent
//   //     .post(`${localAuthBaseURL}/register`)
//   //     .send(userData)
//   //     .set("Accept", "application/json")
//   //     .set("Content-Type", "application/json");

//   //   expect(response.statusCode).toBe(201);
//   //   console.log(response.body);
//   // });

//   // Test the /local/login route
//   it("should log in an existing user", async () => {
//     const loginData = {
//       // Provide user login data here
//       identifier: "ibsifat900@gmail.com",
//       password: "string",
//     };

//     const response = await agent
//       .post(`${localAuthBaseURL}/login`)
//       .send(loginData)
//       .set("Accept", "application/json")
//       .set("Content-Type", "application/json");

//     expect(response.statusCode).toBe(200);
//     // expect(response.body)
//     expect(response.body.message).toBe("success");
//     expect(response.body.user.email).toBe(loginData.identifier);
//   });

//   // Test other routes following a similar pattern

//   // Example: Test the /email-confirmation route
//   it("should confirm the email", async () => {
//     // Perform any necessary setup, e.g., generate a confirmation token

//     const response = await agent
//       .get(`/email-confirmation`)
//       .set("Accept", "application/json")
//       .set("Content-Type", "application/json");

//     expect(response.statusCode).toBe(200);
//     console.log(response);
//     // Add assertions for the email confirmation route response
//   });

//   // Continue testing other routes in a similar manner

//   // Don't forget to handle edge cases and error scenarios
// });

const express = require("express");
const authRoutes = require("../../../src/routes/auth.routes"); // Import your routes
const authControllers = require("../../../src/api/v1/auth/controllers"); // Import your controllers
const request = require("supertest");
const app = require("../../../src/app/app"); // Import your Express app instance

describe("Integration Tests for Auth Routes", () => {
  beforeAll(async () => {
    await createTestUser();
    await createRole(userRole);
    nodemailer.mock.reset(); // Reset the email mock before each test
    nodemailer.mock.onSend = (info) => {
      // You can capture and inspect the sent emails here
      console.log(`Mocked email sent: ${"test"} to ${"ibsifat900@gmail.com"}`);
    };
  });

  afterAll(async () => {
    // nodemailer.mock.restore();
    // Clean up test data after each test case
    await User.deleteMany({});
    await Role.deleteMany({});
  });
  // Test POST /local/login route
  it("should log in an existing user", async () => {
    const loginData = {
      // Provide user login data here
      identifier: "ibsifat900@gmail.com",
      password: "string",
    };
    const response = await agent
      .post(`${localAuthBaseURL}/local/login`)
      .send(loginData)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.statusCode).toBe(200);
    // expect(response.body)
    expect(response.body.message).toBe("success");
    expect(response.body.user.email).toBe(loginData.identifier);
  });
  // Test POST /local/register route
  // it("POST /local/register should return a 201 status", async () => {
  //   const response = await request(app)
  //     .post(`${localAuthBaseURL}/local/register`)
  //     .send({ username: "newuser", password: "newpassword" });
  //   expect(response.status).toBe(201);
  // });
  // Test GET /email-confirmation route
  // it("GET /email-confirmation should return a 200 status", async () => {
  //   const response = await request(app).get(
  //     `${localAuthBaseURL}/email-confirmation`,
  //   );
  //   expect(response.status).toBe(200);
  // });
  // // Test POST /send-email-confirmation route
  it("POST /send-email-confirmation should return a 201 status", async () => {
    const response = await request(app)
      .post(`${localAuthBaseURL}/send-email-confirmation`)
      .send({ email: "ibsifat900@gmail.com" });
    // expect(response.status).toBe(201);
    const sentEmails = nodemailer.mock.sentMail();
    expect(sentEmails.length).toBe(1);
  });
  // // Test POST /forgot-password route
  // it("POST /forgot-password should return a 200 status", async () => {
  //   const response = await request(app)
  //     .post(`${localAuthBaseURL}/forgot-password`)
  //     .send({ email: "test@example.com" });
  //   expect(response.status).toBe(200);
  // });
  // // Test POST /reset-password route
  // it("POST /reset-password should return a 200 status", async () => {
  //   const response = await request(app)
  //     .post(`${localAuthBaseURL}/reset-password`)
  //     .send({ resetToken: "validToken", newPassword: "newPassword" });
  //   expect(response.status).toBe(200);
  // });
  // // Test GET /reset-password-attempts route
  // it("GET /reset-password-attempts should return a 200 status", async () => {
  //   const response = await request(app).get(
  //     `${localAuthBaseURL}/reset-password-attempts`,
  //   );
  //   expect(response.status).toBe(200);
  // });
  // // Test GET /email-confirmation-attempts route
  // it("GET /email-confirmation-attempts should return a 200 status", async () => {
  //   const response = await request(app).get(
  //     `${localAuthBaseURL}/email-confirmation-attempts`,
  //   );
  //   expect(response.status).toBe(200);
  // });
  // Add more tests as needed
});
