const request = require("supertest");
const express = require("express");
const authenticateMiddleware = require("../../../src/middleware/authenticate"); // Import your middleware here
const tokenService = require("../../../src/lib/token");
const { findUserByEmail } = require("../../../src/lib/user/utils");
const app = express();
app.use(express.json());
const authenticate = require("../../../src/middleware/authenticate");
const { authenticationError } = require("../../../src/utils/error");
const getUserDTO = require("../../../src/utils/getUserDTO");

// Mock the required functions and objects
jest.mock("../../../src/lib/token");
jest.mock("../../../src/lib/auth/userService");
jest.mock("../../../src/utils/error");
jest.mock("../../../src/utils");

describe("authenticate middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer validToken",
      },
    };
    res = {};
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should authenticate a valid user", async () => {
    const decodedToken = { email: "user@example.com" };
    tokenService.decodeToken.mockReturnValue(decodedToken);

    const user = { confirmed: true, blocked: false };
    findUserByEmail.mockResolvedValue(user);

    const userDTO = { id: 1, email: "user@example.com" };
    getUserDTO.mockReturnValue(userDTO);

    await authenticate(req, res, next);

    expect(req.user).toEqual(userDTO);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should handle an expired or invalid token", async () => {
    tokenService.decodeToken.mockReturnValue(null);

    await authenticate(req, res, next);

    expect(authenticationError).toHaveBeenCalledWith(
      "Your token expired or invalid. Provide a Valid Token",
    );
    expect(next).toHaveBeenCalledWith(authenticationError());
  });

  it("should handle a user not found", async () => {
    const decodedToken = { email: "user@example.com" };
    tokenService.decodeToken.mockReturnValue(decodedToken);

    findUserByEmail.mockResolvedValue(null);

    await authenticate(req, res, next);

    expect(authenticationError).toHaveBeenCalledWith("user not found");
    expect(next).toHaveBeenCalledWith(authenticationError());
  });

  it("should handle an unconfirmed account", async () => {
    const decodedToken = { email: "user@example.com" };
    tokenService.decodeToken.mockReturnValue(decodedToken);

    const user = { confirmed: false, blocked: false };
    findUserByEmail.mockResolvedValue(user);

    await authenticate(req, res, next);

    expect(authenticationError).toHaveBeenCalledWith(
      "Your account is not verified. Please verify your account",
    );
    expect(next).toHaveBeenCalledWith(authenticationError());
  });

  it("should handle a blocked account", async () => {
    const decodedToken = { email: "user@example.com" };
    tokenService.decodeToken.mockReturnValue(decodedToken);

    const user = { confirmed: true, blocked: true };
    findUserByEmail.mockResolvedValue(user);

    await authenticate(req, res, next);

    expect(authenticationError).toHaveBeenCalledWith("Your account is blocked");
    expect(next).toHaveBeenCalledWith(authenticationError());
  });

  it("should handle an exception", async () => {
    findUserByEmail.mockRejectedValue(new Error("Some error"));

    await authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error("Some error"));
  });
});
