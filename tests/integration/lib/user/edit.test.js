const { edit } = require("../../../../src/lib/user");
const { User } = require("../../../../src/models");
const { updatedUserData } = require("../../../testSeed/user");

// Mock the User model's methods
jest.mock("../../../../src/models", () => {
  const mockUser = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    User: {
      findById: mockUser.findById,
    },
  };
});

describe("User Edit Service", () => {
  it("should edit an existing user", async () => {
    // Mock the findById method to return a user
    const existingUser = {
      id: "userId",
      name: "Old User",
      username: "main username",
      email: "ibsifat100@gmail.com",
      confirmed: true,
      blocked: false,
      password: "string",
      save: jest.fn(),
    };
    User.findById.mockResolvedValue(existingUser);

    const result = await edit("userId", updatedUserData);

    // Verify that the findById method was called with the correct ID
    expect(User.findById).toHaveBeenCalledWith("userId");

    // Verify that the user's properties were updated correctly
    expect(existingUser.name).toBe(updatedUserData.name);
    expect(existingUser.username).toBe(updatedUserData.username);
    expect(existingUser.email).toBe(updatedUserData.email);
    expect(existingUser.confirmed).toBe(updatedUserData.confirmed);
    expect(existingUser.blocked).toBe(updatedUserData.blocked);

    // Verify that the save method was called on the user instance
    expect(existingUser.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("userId");
  });

  it("should throw an error if the user is not found", async () => {
    // Mock the findById method to return null, indicating the user was not found
    User.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentUserId", updatedUserData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("User not found.");
    }
  });
});
