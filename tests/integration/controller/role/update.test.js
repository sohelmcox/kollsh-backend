const request = require("supertest");
const { app } = require("../../../setup/app");
const roleController = require("../../../../src/api/v1/role/controllers");
const roleServices = require("../../../../src/lib/role");
const {
  roleTestUrl,
  updatedRoleData,
  newRoleData,
  mockUpdatedRole,
} = require("../../../testSeed/role");

// Mock service methods
jest.mock("../../../../src/lib/role", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up route
app.put(`${roleTestUrl}/:id`, roleController.updateOrCreate);

describe("Role Update Controller", () => {
  it("should update an existing role", async () => {
    // Mock the updateOrCreate method from your service to return an updated role

    roleServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedRole,
      code: 200,
    });

    const response = await request(app)
      .put(`${roleTestUrl}/roleId`)
      .send(updatedRoleData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Role updated successfully");
    expect(response.body.data.id).toBe("roleId");
    expect(response.body.data.name).toBe("Updated Role");
    expect(response.body.data.description).toBe("Updated Description");
  });

  it("should create a new role if not found", async () => {
    // Mock the updateOrCreate method to create a new role

    roleServices.updateOrCreate.mockResolvedValue({
      data: newRoleData,
      code: 201,
    });

    const response = await request(app)
      .put(`${roleTestUrl}/nonExistentId`)
      .send(updatedRoleData);
    console.log(response);
    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Role created successfully");
    expect(response.body.data.id).toBe("newRoleId");
    expect(response.body.data.name).toBe("New Role");
    expect(response.body.data.description).toBe("Updated Description");
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    roleServices.updateOrCreate.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${roleTestUrl}/roleId`)
      .send(updatedRoleData);

    expect(response.statusCode).toBe(500);
  });
});
