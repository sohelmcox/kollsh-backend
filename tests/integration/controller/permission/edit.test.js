const request = require("supertest");
const { app } = require("../../../setup/app");
const permissionController = require("../../../../src/api/v1/permission/controllers");
const permissionServices = require("../../../../src/lib/permission");
const {
  permissionTestUrl,
  mockUpdatedPermission,
  editPermissionData,
} = require("../../../testSeed/permission");

// Mock service methods
jest.mock("../../../../src/lib/permission", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${permissionTestUrl}/:id`, permissionController.edit);

describe("Permission Edit Controller", () => {
  it("should update an existing permission", async () => {
    // Mock the edit method from your service to return an updated permission
    permissionServices.edit.mockResolvedValue(mockUpdatedPermission);

    const response = await request(app)
      .put(`${permissionTestUrl}/permissionId`)
      .send(editPermissionData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Permission updated successfully");
    expect(response.body.data.id).toBe("permissionId");
    expect(response.body.data.description).toBe("Updated Permission");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    permissionServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${permissionTestUrl}/permissionId`)
      .send(editPermissionData);

    expect(response.statusCode).toBe(500);
  });
});
