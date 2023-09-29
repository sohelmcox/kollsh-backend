const express = require("express");
const supertest = require("supertest");
const { hasPermission } = require("../../../src/middleware/hasPermission");
const { testBaseUrl } = require("../../../src/config");
// Create a simple express app for testing
const app = express();

// Mock findUserByIdPopulateRole function
jest.mock("../../../src/lib/user/utils", () => ({
  findUserByIdPopulateRole: jest.fn(),
}));

describe("hasPermission Middleware", () => {
  it("should grant access when user has required permission", async () => {
    const fakeUser = {
      role: {
        permissions: [
          {
            controller: "SomeController",
            actions: ["read"],
          },
        ],
      },
    };

    const middleware = hasPermission("SomeController", "read");

    // Mock the user retrieval function
    findUserByIdPopulateRole.mockResolvedValueOnce(fakeUser);

    app.use(middleware);
    app.use((req, res) => res.status(200).send("Access granted"));

    const response = await supertest(app)
      .get(`${testBaseUrl}/health`)
      .expect(200);

    expect(response.text).toBe("Access granted");
  });

  it("should deny access when user does not have required permission", async () => {
    const fakeUser = {
      role: {
        permissions: [
          {
            controller: "AnotherController",
            actions: ["write"],
          },
        ],
      },
    };

    const middleware = hasPermission("SomeController", "read");

    // Mock the user retrieval function
    findUserByIdPopulateRole.mockResolvedValueOnce(fakeUser);

    app.use(middleware);
    app.use((req, res) => res.status(200).send("Access granted"));

    const response = await supertest(app)
      .get(`${testBaseUrl}/health`)
      .expect(403);

    expect(response.body.message).toBe("Permission denied");
  });

  it("should handle user not found", async () => {
    const middleware = hasPermission("SomeController", "read");

    // Mock the user retrieval function to return null
    findUserByIdPopulateRole.mockResolvedValueOnce(null);

    app.use(middleware);
    app.use((req, res) => res.status(200).send("Access granted"));

    const response = await supertest(app)
      .get(`${testBaseUrl}/health`)
      .expect(403);

    expect(response.body.message).toBe("User not found");
  });

  it("should handle internal server error", async () => {
    const middleware = hasPermission("SomeController", "read");

    // Mock the user retrieval function to throw an error
    findUserByIdPopulateRole.mockRejectedValueOnce(new Error("Test error"));

    app.use(middleware);
    app.use((req, res) => res.status(200).send("Access granted"));

    const response = await supertest(app)
      .get(`${testBaseUrl}/health`)
      .expect(500);

    expect(response.body.message).toBe("Internal server error");
  });
});
