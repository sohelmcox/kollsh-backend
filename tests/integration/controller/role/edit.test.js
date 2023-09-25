const request = require("supertest");
const { app } = require("../../../setup/app");
const roleController = require("../../../../src/api/v1/role/controllers");
const roleServices = require("../../../../src/lib/role");
const {
  roleTestUrl,
  mockUpdatedRole,
  editRoleData,
} = require("../../../testSeed/role");

// Mock service methods
jest.mock("../../../../src/lib/role", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${roleTestUrl}/:id`, roleController.edit);

describe("Role Edit Controller", () => {
  it("should update an existing role", async () => {
    // Mock the edit method from your service to return an updated role
    roleServices.edit.mockResolvedValue(mockUpdatedRole);

    const response = await request(app)
      .put(`${roleTestUrl}/roleId`)
      .send(editRoleData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Role updated successfully");
    expect(response.body.data.id).toBe("roleId");
    expect(response.body.data.name).toBe("Updated Role");
    expect(response.body.data.description).toBe("Updated Description");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    roleServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${roleTestUrl}/roleId`)
      .send(editRoleData);

    expect(response.statusCode).toBe(500);
  });
});
