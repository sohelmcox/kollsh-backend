const request = require("supertest");
const { app } = require("../../../setup/app");
const permissionController = require("../../../../src/api/v1/permission/controllers");
const permissionServices = require("../../../../src/lib/permission");
const {
  permissionTestUrl,
  updatedPermissionData,
  newPermissionData,
  mockUpdatedPermission,
} = require("../../../testSeed/permission");

// Mock service methods
jest.mock("../../../../src/lib/permission", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up route
app.put(`${permissionTestUrl}/:id`, permissionController.updateOrCreate);
// TODO: fix this test
describe("Permission Update Controller", () => {
  const mockUser = {
    id: 1,
    username: "testuser",
    name: "Ibrahim Sifat",
    email: "ibsifat900@gmail.com",
    confirmed: true,
    blocked: false,
  };
  const mockReq = { user: mockUser };

  it("should update an existing permission", async () => {
    // Mock the updateOrCreate method from your service to return an updated permission

    permissionServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedPermission,
      code: 200,
    });

    const response = await request(app)
      .put(`${permissionTestUrl}/permissionId`)
      .send(updatedPermissionData)
      .send(mockReq);
    console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Permission updated successfully");
    expect(response.body.data.id).toBe("permissionId");
    expect(response.body.data.description).toBe("Updated Description");
  });

  it("should create a new permission if not found", async () => {
    // Mock the updateOrCreate method to create a new permission

    permissionServices.updateOrCreate.mockResolvedValue({
      data: newPermissionData,
      code: 201,
    });

    const response = await request(app)
      .put(`${permissionTestUrl}/nonExistentId`)
      .send(updatedPermissionData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Permission created successfully");
    expect(response.body.data.id).toBe("newPermissionId");
    expect(response.body.data.description).toBe("New Description");
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    permissionServices.updateOrCreate.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .put(`${permissionTestUrl}/permissionId`)
      .send(updatedPermissionData);

    expect(response.statusCode).toBe(500);
  });
});
