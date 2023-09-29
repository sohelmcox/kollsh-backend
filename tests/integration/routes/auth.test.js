// setup database test connection
require("../../setup/testSetup");
const myModule = require("../../../src/lib/auth/sendEmailConfirmation");
const nodemailer = require("nodemailer-mock");
const { create: createRole } = require("../../../src/lib/role");
const { create: createUser, edit: editUser } = require("../../../src/lib/user");
// const router = require("../../../src/routes/auth.routes");
const { testBaseUrl, accessToken } = require("../../../src/config");
// const app = require("../../setup/app");
const { hashing, generateUniqueCode } = require("../../../src/utils");
const agent = require("../../agent");
const createTestUser = require("../../setup/createTestUser");
const { userRole } = require("../../testSeed/role");
const { userData1, userData2 } = require("../../testSeed/user");
const { Role, User } = require("../../../src/models");
// app.use("/", router);
const localAuthBaseURL = `${testBaseUrl}/auth`;

const express = require("express");
const authRoutes = require("../../../src/routes/auth.routes"); // Import your routes
const request = require("supertest");
const app = require("../../../src/app/app"); // Import your Express app instance

const sendEmailService = require("../../../src/lib/auth"); // Replace with the actual path to your service module

// Mock the entire sendEmailService module to avoid actual email sending

describe("Integration Tests for Auth Routes", () => {
  beforeAll(async () => {
    const role = await createRole(userRole);
    await createTestUser(role._id);
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
  // TODO: fix this
  // Test POST /local/register route
  // it("POST /local/register should return a 201 status", async () => {
  //   const response = await request(app)
  //     .post(`${localAuthBaseURL}/local/register`)
  //     .send({ username: "newuser", password: "newpassword" });
  //   expect(response.status).toBe(201);
  // });

  // Test GET /email-confirmation route
  it("GET /email-confirmation should return a 200 status", async () => {
    // create user and update resetPasswordCode manually
    const user = await User.create(userData2);
    const userRole = await Role.findOne({ name: "user" });
    const code = generateUniqueCode();
    const expirationTime = new Date();
    const confirmationCodeExpires = expirationTime.setHours(
      expirationTime.getHours() + 1,
    ); // Set expiration to 1 hour from now
    user.confirmationCode = code;
    user.role = userRole._id;
    user.confirmationCodeExpires = confirmationCodeExpires;
    await user.save();
    const response = await request(app)
      .get(`${localAuthBaseURL}/email-confirmation`)
      .query({ code });

    // verify response
    // console.log(response);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("success");
    // expect(response.body.accessToken).toBeString();
    expect(response.body.user).toBeInstanceOf(Object);
  });
  // Test POST /send-email-confirmation route

  // describe("POST /send-email-confirmation", () => {
  //   // TODO: fix this
  //   // it("should return a 201 status when sending a valid email", async () => {
  //   //   // Mock the implementation of the sendEmailConfirmation function
  //   //   // sendEmailService.sendEmailConfirmation.mockResolvedValue({
  //   //   //   status: "success",
  //   //   // });

  //   //   // Define the request payload (valid email)
  //   //   const payload = { email: "ibsifat900@gmail.com" };

  //   //   // Make the HTTP request to the route
  //   //   const response = await request(app)
  //   //     .post(`${localAuthBaseURL}/send-email-confirmation`)
  //   //     .send(payload);

  //   //   // Assertions
  //   //   expect(response.status).toBe(200);
  //   //   // expect(response.body.status).toBe("success");
  //   //   // expect(response.body.message).toBe(
  //   //   //   "Verification email sent successfully",
  //   //   // );
  //   // });

  //   it("should return an error status when sending an invalid email", async () => {
  //     // Define the request payload (invalid email)
  //     const payload = { email: "invalidemail@gmail.com" };

  //     // Make the HTTP request to the route
  //     const response = await request(app)
  //       .post(`${localAuthBaseURL}/send-email-confirmation`)
  //       .send(payload);

  //     // Assertions
  //     expect(response.status).toBe(400);
  //     expect(response.body.message).toBe("User not found.");
  //   });
  // });

  // // Test POST /forgot-password route
  // it("POST /forgot-password should return a 200 status", async () => {
  //   const response = await request(app)
  //     .post(`${localAuthBaseURL}/forgot-password`)
  //     .send({ email: "test@example.com" });
  //   expect(response.status).toBe(200);
  // });
  // Test POST /reset-password route
  it("POST /reset-password should return change password and 200 status", async () => {
    // create user and update resetPasswordCode manually
    const user = await User.create(userData1);
    const code = generateUniqueCode();
    const expirationTime = new Date();
    const resetPasswordRCodeExpires = expirationTime.setHours(
      expirationTime.getHours() + 1,
    ); // Set expiration to 1 hour from now
    user.resetPasswordCode = code;
    user.resetPasswordRCodeExpires = resetPasswordRCodeExpires;
    await user.save();

    // send request for reset password
    const response = await request(app)
      .post(`${localAuthBaseURL}/reset-password`)
      .send({
        code,
        password: "newPassword",
        passwordConfirmation: "newPassword",
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Password reset successful.");
  });
  // Test GET /reset-password-attempts route
  it("GET /reset-password-attempts should return a 200 status", async () => {
    const response = await request(app)
      .get(`${localAuthBaseURL}/reset-password-attempts`)
      .query({ email: "ibsifat900@gmail.com" });
    expect(response.status).toBe(200);
  });
  // Test GET /email-confirmation-attempts route
  it("GET /email-confirmation-attempts should return a 200 status", async () => {
    const response = await request(app)
      .get(`${localAuthBaseURL}/email-confirmation-attempts`)
      .query({ email: "ibsifat900@gmail.com" });
    expect(response.status).toBe(200);
  });
});
