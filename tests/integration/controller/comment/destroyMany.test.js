const request = require("supertest");
const { app } = require("../../../setup/app");
const commentController = require("../../../../src/api/v1/comment/controllers");
const commentServices = require("../../../../src/lib/comment");
const { commentTestUrl } = require("../../../testSeed/comment");

// Mock service methods
jest.mock("../../../../src/lib/comment", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(commentTestUrl, commentController.destroyMany);

describe("Comment DestroyMany Controller", () => {
  it("should delete multiple comments with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted comments
    commentServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(commentTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 comments deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    commentServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(commentTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    commentServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(commentTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
