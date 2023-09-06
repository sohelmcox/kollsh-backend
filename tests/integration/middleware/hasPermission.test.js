const { hasPermission } = require("../../../src/middleware/hasPermission");
const userService = require("../../../src/lib/user");

// Mock the required dependencies
jest.mock("../../../src/lib/user", () => ({
  findUserByIdPopulateRole: jest.fn(),
}));

describe("hasPermission", () => {
  beforeEach(() => {
    // Clear the mock calls for findUserByIdPopulateRole before each test
    userService.findUserByIdPopulateRole.mockClear();
  });

  it("should allow access for a user with the required permission", async () => {
    // Mock the user and role data
    const user = {
      _id: "user123",
      role: {
        permissions: [
          {
            controller: "exampleController",
            actions: ["read"],
          },
        ],
      },
    };

    // Set up the mock to return the user data when findUserByIdPopulateRole is called
    userService.findUserByIdPopulateRole.mockResolvedValue(user);

    // Create mock request and response objects
    const req = {
      user: { id: "user123" }, // Simulate an authenticated user
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the hasPermission middleware
    await hasPermission("exampleController", "read")(req, res, next);

    // Expectations
    expect(userService.findUserByIdPopulateRole).toHaveBeenCalledWith(
      "user123",
    );
    expect(next).toHaveBeenCalled(); // Access should be allowed
    expect(res.status).not.toHaveBeenCalled(); // Response status should not be set
    expect(res.json).not.toHaveBeenCalled(); // Response JSON should not be called
  });

  it("should deny access for a user without the required permission", async () => {
    // Mock the user and role data
    const user = {
      _id: "user123",
      role: {
        permissions: [
          {
            controller: "exampleController",
            actions: ["write"], // This does not match the required action
          },
        ],
      },
    };

    // Set up the mock to return the user data when findUserByIdPopulateRole is called
    userService.findUserByIdPopulateRole.mockResolvedValue(user);

    // Create mock request and response objects
    const req = {
      user: { id: "user123" }, // Simulate an authenticated user
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the hasPermission middleware
    await hasPermission("exampleController", "read")(req, res, next);

    // Expectations
    expect(userService.findUserByIdPopulateRole).toHaveBeenCalledWith(
      "user123",
    );
    expect(next).not.toHaveBeenCalled(); // Access should be denied
    expect(res.status).toHaveBeenCalledWith(403); // Response status should be set to 403
    expect(res.json).toHaveBeenCalledWith({ message: "Permission denied" }); // Response JSON should match
  });

  it("should handle user not found", async () => {
    // Set up the mock to return null when findUserByIdPopulateRole is called
    userService.findUserByIdPopulateRole.mockResolvedValue(null);

    // Create mock request and response objects
    const req = {
      user: { id: "user123" }, // Simulate an authenticated user
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the hasPermission middleware
    await hasPermission("exampleController", "read")(req, res, next);

    // Expectations
    expect(userService.findUserByIdPopulateRole).toHaveBeenCalledWith(
      "user123",
    );
    expect(next).not.toHaveBeenCalled(); // Access should be denied
    expect(res.status).toHaveBeenCalledWith(403); // Response status should be set to 403
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" }); // Response JSON should match
  });

  it("should handle internal server error", async () => {
    // Set up the mock to throw an error when findUserByIdPopulateRole is called
    userService.findUserByIdPopulateRole.mockRejectedValue(
      new Error("Database error"),
    );

    // Create mock request and response objects
    const req = {
      user: { id: "user123" }, // Simulate an authenticated user
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the hasPermission middleware
    await hasPermission("exampleController", "read")(req, res, next);

    // Expectations
    expect(userService.findUserByIdPopulateRole).toHaveBeenCalledWith(
      "user123",
    );
    expect(next).not.toHaveBeenCalled(); // Access should be denied
    expect(res.status).toHaveBeenCalledWith(500); // Response status should be set to 500
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" }); // Response JSON should match
  });
});
