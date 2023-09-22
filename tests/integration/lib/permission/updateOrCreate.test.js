const { updateOrCreate } = require("../../../../src/lib/permission");
const { Permission } = require("../../../../src/models");
const {
  newPermissionData,
  updatedPermissionData,
  existingPermissionData,
} = require("../../../testSeed/permission");
// Mock the Permission model's methods
jest.mock("../../../../src/models", () => {
  const mockPermission = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    Permission: {
      findById: mockPermission.findById,
      findOne: mockPermission.findOne,
      create: mockPermission.create,
    },
  };
});

describe("Permission Update or Create Service", () => {
  it("should create a new permission if it does not exist", async () => {
    // Mock the findById method to return null, indicating the permission does not exist
    Permission.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the permission name is not found
    Permission.findOne.mockResolvedValue(null);

    // Mock the create method to return a new permission instance
    const createdPermissionInstance = {
      id: "newPermissionId",
      ...newPermissionData,
      save: jest.fn(),
    };
    Permission.create.mockReturnValue(createdPermissionInstance);

    const result = await updateOrCreate("newPermissionId", {
      ...newPermissionData,
    });
    // console.log(result);
    expect(result.code).toBe(201);
  });
  it("should update an existing permission if it exists", async () => {
    // Mock an existing permission
    const existingPermission = {
      id: "existingPermissionId",
      description: "Existing Description",
      controller: "string",
      actions: ["string"],
      overwrite: jest.fn(),
      save: jest.fn(),
    };
    Permission.findById.mockResolvedValue(existingPermission);

    // Mock the findOne method to return null, indicating the permission name is not found
    Permission.findOne.mockResolvedValue(null);

    const result = await updateOrCreate(
      "existingPermissionId",
      updatedPermissionData,
    );

    // Verify that the findById method was called with the correct ID
    expect(Permission.findById).toHaveBeenCalledWith("existingPermissionId");

    // Verify that the overwrite and save methods were called on the existing permission
    expect(existingPermission.overwrite).toHaveBeenCalledWith({
      description: updatedPermissionData.description,
      controller: updatedPermissionData.controller,
      actions: updatedPermissionData.actions,
    });
    expect(existingPermission.save).toHaveBeenCalled();

    // Verify the result
    // expect(result.data).toEqual({ ...existingPermission });
    expect(result.code).toBe(200);
  });
});
