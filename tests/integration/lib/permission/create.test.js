const { updateOrCreate } = require("../../../../src/lib/permission");
const { Permission } = require("../../../../src/models");
const {
  newPermissionData,
  existingPermission,
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
  it("should create a new permission", async () => {
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
});
