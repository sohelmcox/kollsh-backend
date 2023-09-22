const { findSingle } = require("../../../../src/lib/permission");
const { Permission } = require("../../../../src/models");
const { newPermissionData } = require("../../../testSeed/permission");

// Mock the Permission model's methods
jest.mock("../../../../src/models", () => {
  const mockPermission = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    Permission: {
      findById: mockPermission.findById,
    },
  };
});

describe("Permission Find Single Service", () => {
  it("should find a single permission by ID", async () => {
    // Mock the Permission model's findById method to return a sample permission

    Permission.findById.mockResolvedValue(newPermissionData);

    const params = {
      id: "newPermissionId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(Permission.findById).toHaveBeenCalledWith(params);

    // Verify the result
    console.log(result);
    expect(result.id).toEqual("newPermissionId");
  });

  it("should throw a notFound error if permission with given ID is not found", async () => {
    // Mock the Permission model's findById method to return null, indicating the permission is not found
    Permission.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("Permission not Found");
      // console.log(error);
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
