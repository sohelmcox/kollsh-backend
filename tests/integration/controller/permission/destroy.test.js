const request = require("supertest");
const { app } = require("../../../setup/app");
const permissionController = require("../../../../src/api/v1/permission/controllers");
const permissionServices = require("../../../../src/lib/permission");
const { permissionTestUrl } = require("../../../testSeed/permission");

// Mock service methods
jest.mock("../../../../src/lib/permission", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${permissionTestUrl}/:id`, permissionController.destroy);

describe("Permission Destroy Controller", () => {
  it("should delete an existing permission", async () => {
    // Mock the destroy method from your service to indicate success
    permissionServices.destroy.mockResolvedValue();

    const response = await request(app).delete(
      `${permissionTestUrl}/:permissionId`,
    );

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    permissionServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(
      `${permissionTestUrl}/:permissionId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
