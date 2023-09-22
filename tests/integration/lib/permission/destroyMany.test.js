const { destroyMany } = require("../../../../src/lib/permission");
const { Permission } = require("../../../../src/models");

describe("Permission Destroy Many Service", () => {
  it("should delete multiple permissions by their IDs", async () => {
    // Create a mock for the Permission model
    const mockPermissionModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the Permission model with the mock model for this test
    jest
      .spyOn(Permission, "deleteMany")
      .mockImplementation(mockPermissionModel.deleteMany);

    const permissionIdsToDelete = ["permissionId1", "permissionId2"]; // Replace with valid permission IDs

    const deletedCount = await destroyMany(permissionIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockPermissionModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: permissionIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting permissions", async () => {
    // Create a mock for the Permission model
    const mockPermissionModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting permissions")),
    };

    // Replace the Permission model with the mock model for this test
    jest
      .spyOn(Permission, "deleteMany")
      .mockImplementation(mockPermissionModel.deleteMany);

    const permissionIdsToDelete = ["permissionId1", "permissionId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(permissionIdsToDelete)).rejects.toThrowError(
      "Error deleting permissions",
    );
  });
});
