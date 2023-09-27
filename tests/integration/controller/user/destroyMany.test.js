const request = require("supertest");
const { app } = require("../../../setup/app");
const userController = require("../../../../src/api/v1/user/controllers");
const userServices = require("../../../../src/lib/user");
const { userTestUrl } = require("../../../testSeed/user");

// Mock service methods
jest.mock("../../../../src/lib/user", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(userTestUrl, userController.destroyMany);

describe("User DestroyMany Controller", () => {
  it("should delete multiple users with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted users
    userServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(userTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 users deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    userServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(userTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    userServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(userTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
