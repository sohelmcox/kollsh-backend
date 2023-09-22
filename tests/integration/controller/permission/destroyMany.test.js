const request = require("supertest");
const { app } = require("../../../setup/app");
const permissionController = require("../../../../src/api/v1/permission/controllers");
const permissionServices = require("../../../../src/lib/permission");
const { permissionTestUrl } = require("../../../testSeed/permission");

// Mock service methods
jest.mock("../../../../src/lib/permission", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(permissionTestUrl, permissionController.destroyMany);

describe("Permission DestroyMany Controller", () => {
  it("should delete multiple permissions with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted permissions
    permissionServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(permissionTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 permissions deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    permissionServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(permissionTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    permissionServices.destroyMany.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .delete(permissionTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
