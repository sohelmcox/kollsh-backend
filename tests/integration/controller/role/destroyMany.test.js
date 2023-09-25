const request = require("supertest");
const { app } = require("../../../setup/app");
const roleController = require("../../../../src/api/v1/role/controllers");
const roleServices = require("../../../../src/lib/role");
const { roleTestUrl } = require("../../../testSeed/role");

// Mock service methods
jest.mock("../../../../src/lib/role", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(roleTestUrl, roleController.destroyMany);

describe("Role DestroyMany Controller", () => {
  it("should delete multiple roles with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted roles
    roleServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(roleTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 roles deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    roleServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(roleTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    roleServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(roleTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
