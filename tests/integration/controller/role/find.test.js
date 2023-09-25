const request = require("supertest");
const { app } = require("../../../setup/app");
const roleController = require("../../../../src/api/v1/role/controllers");
const roleServices = require("../../../../src/lib/role");
const {
  roleTestUrl,
  createRoleData,
  roleTestQuery,
} = require("../../../testSeed/role");

// Mock the required dependencies
jest.mock("../../../../src/lib/role", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(roleTestUrl, roleController.find);

describe("Role Find Controller", () => {
  it("should find roles with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of roles

    roleServices.findAll.mockResolvedValue(createRoleData);

    const response = await request(app).get(roleTestUrl).query(roleTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
