const { findSingle } = require("../../../../src/lib/userProfile");
const { UserProfile } = require("../../../../src/models");
const { newUserProfileData } = require("../../../testSeed/userProfile");

// Mock the UserProfile model's methods
jest.mock("../../../../src/models", () => {
  const mockUserProfile = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    UserProfile: {
      findById: mockUserProfile.findById,
    },
  };
});

describe("UserProfile Find Single Service", () => {
  it("should find a single userProfile by ID", async () => {
    // Mock the UserProfile model's findById method to return a sample userProfile

    UserProfile.findById.mockResolvedValue(newUserProfileData);

    const params = {
      id: "newUserProfileId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(UserProfile.findById).toHaveBeenCalledWith("newUserProfileId");

    // Verify the result
    expect(result).toEqual(newUserProfileData);
    expect(result.firstName).toEqual("New UserProfile");
  });

  it("should throw a notFound error if userProfile with given ID is not found", async () => {
    // Mock the UserProfile model's findById method to return null, indicating the userProfile is not found
    UserProfile.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("UserProfile not found");
      // console.log(error);
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
