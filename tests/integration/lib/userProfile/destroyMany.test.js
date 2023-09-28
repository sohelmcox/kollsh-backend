const { destroyMany } = require("../../../../src/lib/userProfile");
const { UserProfile } = require("../../../../src/models");

describe("UserProfile Destroy Many Service", () => {
  it("should delete multiple userProfiles by their IDs", async () => {
    // Create a mock for the UserProfile model
    const mockUserProfileModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the UserProfile model with the mock model for this test
    jest
      .spyOn(UserProfile, "deleteMany")
      .mockImplementation(mockUserProfileModel.deleteMany);

    const userProfileIdsToDelete = ["userProfileId1", "userProfileId2"]; // Replace with valid userProfile IDs

    const deletedCount = await destroyMany(userProfileIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockUserProfileModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: userProfileIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting userProfiles", async () => {
    // Create a mock for the UserProfile model
    const mockUserProfileModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting userProfiles")),
    };

    // Replace the UserProfile model with the mock model for this test
    jest
      .spyOn(UserProfile, "deleteMany")
      .mockImplementation(mockUserProfileModel.deleteMany);

    const userProfileIdsToDelete = ["userProfileId1", "userProfileId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(userProfileIdsToDelete)).rejects.toThrowError(
      "Error deleting userProfiles",
    );
  });
});
