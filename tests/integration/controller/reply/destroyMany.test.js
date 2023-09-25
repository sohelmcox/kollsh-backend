const request = require("supertest");
const { app } = require("../../../setup/app");
const replyController = require("../../../../src/api/v1/reply/controllers");
const replyServices = require("../../../../src/lib/reply");
const { replyTestUrl } = require("../../../testSeed/reply");

// Mock service methods
jest.mock("../../../../src/lib/reply", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(replyTestUrl, replyController.destroyMany);

describe("Reply DestroyMany Controller", () => {
  it("should delete multiple replies with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted replies
    replyServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(replyTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 replies deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    replyServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(replyTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    replyServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(replyTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
