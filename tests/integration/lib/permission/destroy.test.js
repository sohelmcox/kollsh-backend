const { destroy } = require("../../../../src/lib/permission");
const { Permission } = require("../../../../src/models");

// Mock the Permission model's methods
jest.mock("../../../../src/models", () => {
  const mockPermission = {
    findById: jest.fn(),
  };

  return {
    Permission: {
      findById: mockPermission.findById,
    },
  };
});

describe("Permission Destroy Service", () => {
  it("should destroy an existing permission", async () => {
    // Mock the findById method to return a permission
    const mockPermissionInstance = {
      deleteOne: jest.fn(),
    };
    Permission.findById.mockResolvedValue(mockPermissionInstance);

    await destroy("permissionId");

    // Verify that the findById method was called with the correct ID
    expect(Permission.findById).toHaveBeenCalledWith("permissionId");

    // Verify that the deleteOne method was called on the permission instance
    expect(mockPermissionInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the permission is not found", async () => {
    // Mock the findById method to return null, indicating the permission was not found
    Permission.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent permission
    try {
      await destroy("nonExistentPermissionId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Permission not found.");
      expect(error.status).toBe(404);
    }
  });
});
