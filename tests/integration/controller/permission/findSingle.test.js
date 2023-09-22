const request = require("supertest");
const { app } = require("../../../setup/app");
const permissionController = require("../../../../src/api/v1/permission/controllers");
const permissionServices = require("../../../../src/lib/permission");
const {
  permissionTestUrl,
  mockPermission,
} = require("../../../testSeed/permission");

// Mock service methods
jest.mock("../../../../src/lib/permission", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${permissionTestUrl}/:id`, permissionController.findSingle);

describe("Permission FindSingle Controller", () => {
  it("should find a single permission by ID", async () => {
    // Mock the findSingle method from your service to return a permission

    permissionServices.findSingle.mockResolvedValue(mockPermission);

    const response = await request(app).get(
      `${permissionTestUrl}/permissionId`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("permissionId");
    expect(response.body.data.description).toBe("Test Permission");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    permissionServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(
      `${permissionTestUrl}/permissionId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
