const { destroy } = require("../../../../src/lib/userProfile");
const { UserProfile } = require("../../../../src/models");

// Mock the UserProfile model's methods
jest.mock("../../../../src/models", () => {
  const mockUserProfile = {
    findById: jest.fn(),
  };

  return {
    UserProfile: {
      findById: mockUserProfile.findById,
    },
  };
});

describe("UserProfile Destroy Service", () => {
  it("should destroy an existing userProfile", async () => {
    // Mock the findById method to return a userProfile
    const mockUserProfileInstance = {
      deleteOne: jest.fn(),
    };
    UserProfile.findById.mockResolvedValue(mockUserProfileInstance);

    await destroy("userProfileId");

    // Verify that the findById method was called with the correct ID
    expect(UserProfile.findById).toHaveBeenCalledWith("userProfileId");

    // Verify that the deleteOne method was called on the userProfile instance
    expect(mockUserProfileInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the userProfile is not found", async () => {
    // Mock the findById method to return null, indicating the userProfile was not found
    UserProfile.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent userProfile
    try {
      await destroy("nonExistentUserProfileId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("userProfile not found.");
      expect(error.status).toBe(404);
    }
  });
});
