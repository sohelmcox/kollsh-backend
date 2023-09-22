const request = require("supertest");
const { app } = require("../../../setup/app");
const permissionController = require("../../../../src/api/v1/permission/controllers");
const permissionServices = require("../../../../src/lib/permission");
const {
  permissionTestUrl,
  createPermissionData,
  permissionTestQuery,
} = require("../../../testSeed/permission");

// Mock the required dependencies
jest.mock("../../../../src/lib/permission", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(permissionTestUrl, permissionController.find);

describe("Permission Find Controller", () => {
  it("should find permissions with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of permissions

    permissionServices.findAll.mockResolvedValue(createPermissionData);

    const response = await request(app)
      .get(permissionTestUrl)
      .query(permissionTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
