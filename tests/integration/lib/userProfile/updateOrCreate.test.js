const { updateOrCreate } = require("../../../../src/lib/userProfile");
const { UserProfile } = require("../../../../src/models");
const {
  newUserProfileData,
  updatedUserProfileData,
  existingUserProfileData,
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
  it("should create a new userProfile if it does not exist", async () => {
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
  it("should update an existing userProfile if it exists", async () => {
    // Mock an existing userProfile
    const existingUserProfile = {
      id: "existingUserProfileId",
      firstName: "Test UserProfile",
      lastName: "Doe",
      bio: "string",
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
      overwrite: jest.fn(),
      save: jest.fn(),
    };
    UserProfile.findById.mockResolvedValue(existingUserProfile);

    // Mock the findOne method to return null, indicating the userProfile name is not found
    UserProfile.findOne.mockResolvedValue(null);

    const result = await updateOrCreate(
      "existingUserProfileId",
      updatedUserProfileData,
    );

    // Verify that the findById method was called with the correct ID
    expect(UserProfile.findById).toHaveBeenCalledWith("existingUserProfileId");

    // Verify that the overwrite and save methods were called on the existing userProfile
    // expect(existingUserProfile.overwrite).toHaveBeenCalledWith({
    //   firstName: updatedUserProfileData.firstName,
    //   lastName: updatedUserProfileData.lastName,
    //   bio: updatedUserProfileData.bio,
    //   country: updatedUserProfileData.country,
    //   state: updatedUserProfileData.state,
    //   city: updatedUserProfileData.city,
    //   avatar: updatedUserProfileData.avatar,
    //   social_link: updatedUserProfileData.social_link,
    // });
    expect(existingUserProfile.save).toHaveBeenCalled();

    // Verify the result
    expect(result.code).toBe(200);
  });
});
