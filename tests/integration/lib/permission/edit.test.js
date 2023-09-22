const { edit } = require("../../../../src/lib/permission");
const { Permission } = require("../../../../src/models");
const { updatedPermissionData } = require("../../../testSeed/permission");

// Mock the Permission model's methods
jest.mock("../../../../src/models", () => {
  const mockPermission = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    Permission: {
      findById: mockPermission.findById,
    },
  };
});

describe("Permission Edit Service", () => {
  it("should edit an existing permission", async () => {
    // Mock the findById method to return a permission
    const existingPermission = {
      id: "permissionId",
      description: "Old Description",
      controller: "string",
      actions: ["string"],
      save: jest.fn(),
    };
    Permission.findById.mockResolvedValue(existingPermission);

    const result = await edit("permissionId", updatedPermissionData);

    // Verify that the findById method was called with the correct ID
    expect(Permission.findById).toHaveBeenCalledWith("permissionId");

    // Verify that the permission's properties were updated correctly
    expect(existingPermission.description).toBe(
      updatedPermissionData.description,
    );

    // Verify that the save method was called on the permission instance
    expect(existingPermission.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("permissionId");
  });

  it("should throw an error if the permission is not found", async () => {
    // Mock the findById method to return null, indicating the permission was not found
    Permission.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentPermissionId", updatedPermissionData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Permission not found.");
    }
  });
});
