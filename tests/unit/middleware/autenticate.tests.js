const request = require("supertest");
const express = require("express");
const authenticateMiddleware = require("../../../src/middleware/authenticate"); // Import your middleware here
const tokenService = require("../../../src/lib/token");
const { findUserByEmail } = require("../../../src/lib/user/utils");
const app = express();
app.use(express.json());

// Mock the required services and functions
jest.mock("../../../src/lib/token", () => ({
  decodeToken: jest.fn(),
}));

jest.mock("../../../src/lib/user/utils", () => ({
  findUserByEmail: jest.fn(),
}));

const {
  authenticationError,
  // Other error functions you might need to mock
} = require("../../../src/utils/error");
const { accessToken } = require("../../../src/config");
const authenticateMiddleware = require("./authenticate"); // Import your middleware here
const tokenService = require("../lib/token");
const { findUserByEmail } = require("../lib/auth/userService");
const { authenticationError } = require("../utils/error");
const { getUserDTO } = require("../utils");

// Mock required services and functions
jest.mock("../lib/token");
jest.mock("../lib/auth/userService");
jest.mock("../utils/error");
jest.mock("../utils");

describe("Authenticate Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    // Initialize mocks and request objects before each test
    req = {};
    res = {};
    next = jest.fn();
  });

  afterEach(() => {
    // Reset all mocks and clear any side effects
    jest.clearAllMocks();
  });

  it("should handle successful authentication", async () => {
    // Mock token decoding and user retrieval
    tokenService.decodeToken.mockReturnValue({ email: "user@example.com" });
    findUserByEmail.mockResolvedValue({
      _id: "user-id",
      email: "user@example.com",
      confirmed: true,
      blocked: false,
    });
    getUserDTO.mockReturnValue({ id: "user-id", name: "User" });

    // Call the middleware
    await authenticateMiddleware(req, res, next);

    // Assertions
    expect(req.user).toEqual({ id: "user-id", name: "User" });
    expect(next).toHaveBeenCalled();
  });

  it("should handle expired or invalid tokens", async () => {
    // Mock token decoding
    tokenService.decodeToken.mockReturnValue(null);

    // Call the middleware
    await authenticateMiddleware(req, res, next);

    // Assertions
    expect(authenticationError).toHaveBeenCalledWith(
      "Your token expired or invalid. Provide a Valid Token",
    );
    expect(next).toHaveBeenCalledWith(authenticationError());
  });

  it("should handle user not found", async () => {
    // Mock token decoding and user retrieval
    tokenService.decodeToken.mockReturnValue({
      email: "nonexistent@example.com",
    });
    findUserByEmail.mockResolvedValue(null);

    // Call the middleware
    await authenticateMiddleware(req, res, next);

    // Assertions
    expect(authenticationError).toHaveBeenCalledWith("User not found");
    expect(next).toHaveBeenCalledWith(authenticationError());
  });

  // Add more test cases for other error scenarios (e.g., account not confirmed, blocked account)
});
