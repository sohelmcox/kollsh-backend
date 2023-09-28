const { edit } = require("../../../../src/lib/userProfile");
const { UserProfile } = require("../../../../src/models");
const { updatedUserProfileData } = require("../../../testSeed/userProfile");

// Mock the UserProfile model's methods
jest.mock("../../../../src/models", () => {
  const mockUserProfile = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    UserProfile: {
      findById: mockUserProfile.findById,
    },
  };
});

describe("UserProfile Edit Service", () => {
  it("should edit an existing userProfile", async () => {
    // Mock the findById method to return a userProfile
    const existingUserProfile = {
      id: "userProfileId",
      firstName: "Test UserProfile",
      lastName: "Doe",
      boi: "string",
      country: "6502a59b35d01ff95a2c2527",
      state: "6502a69b35d01ff95a2c2528",
      city: "6501a69b35d01ff95a2c2529",
      avatar: "6501a69b34d01ff95a2c2524",
      social_link: [
        {
          platform: "string",
          link: "string",
        },
      ],
      userId: "6501a39b34d91ff95a2c2521",
      save: jest.fn(),
    };
    UserProfile.findById.mockResolvedValue(existingUserProfile);

    const result = await edit("userProfileId", updatedUserProfileData);

    // Verify that the findById method was called with the correct ID
    expect(UserProfile.findById).toHaveBeenCalledWith("userProfileId");

    // Verify that the userProfile's properties were updated correctly
    expect(existingUserProfile.firstName).toBe(
      updatedUserProfileData.firstName,
    );
    expect(existingUserProfile.lastName).toBe(updatedUserProfileData.lastName);
    // Verify that the save method was called on the userProfile instance
    expect(existingUserProfile.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("userProfileId");
  });

  it("should throw an error if the userProfile is not found", async () => {
    // Mock the findById method to return null, indicating the userProfile was not found
    UserProfile.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentUserProfileId", updatedUserProfileData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("UserProfile not found.");
    }
  });
});
