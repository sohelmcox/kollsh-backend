const { updateOrCreate } = require("../../../../src/lib/userProfile");
const { UserProfile } = require("../../../../src/models");
const {
  newUserProfileData,
  existingUserProfile,
} = require("../../../testSeed/userProfile");
// Mock the UserProfile model's methods
jest.mock("../../../../src/models", () => {
  const mockUserProfile = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    UserProfile: {
      findById: mockUserProfile.findById,
      findOne: mockUserProfile.findOne,
      create: mockUserProfile.create,
    },
  };
});

describe("UserProfile Update or Create Service", () => {
  it("should create a new userProfile", async () => {
    // Mock the findById method to return null, indicating the userProfile does not exist
    UserProfile.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the userProfile name is not found
    UserProfile.findOne.mockResolvedValue(null);

    // Mock the create method to return a new userProfile instance
    const createdUserProfileInstance = {
      id: "newUserProfileId",
      ...newUserProfileData,
      save: jest.fn(),
    };
    UserProfile.create.mockReturnValue(createdUserProfileInstance);

    const result = await updateOrCreate("newUserProfileId", {
      ...newUserProfileData,
    });
    // console.log(result);
    expect(result.code).toBe(201);
  });
});
