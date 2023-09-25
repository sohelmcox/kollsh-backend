const request = require("supertest");
const { app } = require("../../../setup/app");
const roleController = require("../../../../src/api/v1/role/controllers");
const roleServices = require("../../../../src/lib/role");
const { roleTestUrl, mockRole } = require("../../../testSeed/role");

// Mock service methods
jest.mock("../../../../src/lib/role", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${roleTestUrl}/:id`, roleController.findSingle);

describe("Role FindSingle Controller", () => {
  it("should find a single role by ID", async () => {
    // Mock the findSingle method from your service to return a role

    roleServices.findSingle.mockResolvedValue(mockRole);

    const response = await request(app).get(`${roleTestUrl}/roleId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("roleId");
    expect(response.body.data.name).toBe("Test Role");
    expect(response.body.data.description).toBe("Test Description");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    roleServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${roleTestUrl}/roleId`);

    expect(response.statusCode).toBe(500);
  });
});
