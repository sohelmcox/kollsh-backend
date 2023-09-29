const { destroy } = require("../../../../src/lib/user");
const { User, UserProfile } = require("../../../../src/models");

// Mock the User model's methods
jest.mock("../../../../src/models", () => {
  const mockUser = {
    findById: jest.fn(),
    findOne: jest.fn(),
  };

  return {
    User: {
      findById: mockUser.findById,
      findOne: mockUser.findOne,
    },
    UserProfile: {
      findById: mockUser.findById,
      findOne: mockUser.findOne,
    },
  };
});

describe("User Destroy Service", () => {
  it("should destroy an existing user", async () => {
    // Mock the findById method to return a user
    const mockUserInstance = {
      deleteOne: jest.fn(),
      UserProfile: jest.fn(),
      findOne: jest.fn(),
    };
    User.findById.mockResolvedValue(mockUserInstance);
    UserProfile.findById.mockResolvedValue(mockUserInstance);
    UserProfile.findOne.mockResolvedValue(mockUserInstance);

    await destroy("651481fb16b417cab5c56f83");

    // Verify that the findById method was called with the correct ID
    expect(User.findById).toHaveBeenCalledWith("651481fb16b417cab5c56f83");

    // Verify that the deleteOne method was called on the user instance
    expect(mockUserInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the user is not found", async () => {
    // Mock the findById method to return null, indicating the user was not found
    User.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent user
    try {
      await destroy("nonExistentUserId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("user not found.");
      expect(error.status).toBe(404);
    }
  });
});
