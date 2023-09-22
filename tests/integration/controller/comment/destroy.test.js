const request = require("supertest");
const { app } = require("../../../setup/app");
const commentController = require("../../../../src/api/v1/comment/controllers");
const commentServices = require("../../../../src/lib/comment");
const { commentTestUrl } = require("../../../testSeed/comment");

// Mock service methods
jest.mock("../../../../src/lib/comment", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${commentTestUrl}/:id`, commentController.destroy);

describe("Comment Destroy Controller", () => {
  it("should delete an existing comment", async () => {
    // Mock the destroy method from your service to indicate success
    commentServices.destroy.mockResolvedValue();

    const response = await request(app).delete(`${commentTestUrl}/:commentId`);

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    commentServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(`${commentTestUrl}/:commentId`);

    expect(response.statusCode).toBe(500);
  });
});
