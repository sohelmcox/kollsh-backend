const request = require("supertest");
const { app } = require("../../../setup/app");
const roleController = require("../../../../src/api/v1/role/controllers");
const roleServices = require("../../../../src/lib/role");
const { roleTestUrl } = require("../../../testSeed/role");

// Mock service methods
jest.mock("../../../../src/lib/role", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${roleTestUrl}/:id`, roleController.destroy);

describe("Role Destroy Controller", () => {
  it("should delete an existing role", async () => {
    // Mock the destroy method from your service to indicate success
    roleServices.destroy.mockResolvedValue();

    const response = await request(app).delete(`${roleTestUrl}/:roleId`);

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    roleServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(`${roleTestUrl}/:roleId`);

    expect(response.statusCode).toBe(500);
  });
});
