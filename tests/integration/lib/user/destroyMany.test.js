const { destroyMany } = require("../../../../src/lib/user");
const { User } = require("../../../../src/models");

describe("User Destroy Many Service", () => {
  it("should delete multiple users by their IDs", async () => {
    // Create a mock for the User model
    const mockUserModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the User model with the mock model for this test
    jest.spyOn(User, "deleteMany").mockImplementation(mockUserModel.deleteMany);

    const userIdsToDelete = ["userId1", "userId2"]; // Replace with valid user IDs

    const deletedCount = await destroyMany(userIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockUserModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: userIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting users", async () => {
    // Create a mock for the User model
    const mockUserModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting users")),
    };

    // Replace the User model with the mock model for this test
    jest.spyOn(User, "deleteMany").mockImplementation(mockUserModel.deleteMany);

    const userIdsToDelete = ["userId1", "userId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(userIdsToDelete)).rejects.toThrowError(
      "Error deleting users",
    );
  });
});
