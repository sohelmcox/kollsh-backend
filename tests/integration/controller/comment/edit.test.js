const request = require("supertest");
const { app } = require("../../../setup/app");
const commentController = require("../../../../src/api/v1/comment/controllers");
const commentServices = require("../../../../src/lib/comment");
const {
  commentTestUrl,
  mockUpdatedComment,
  editCommentData,
} = require("../../../testSeed/comment");

// Mock service methods
jest.mock("../../../../src/lib/comment", () => ({
  edit: jest.fn(),
}));

// Set up Express app and route
app.put(`${commentTestUrl}/:id`, commentController.edit);

describe("Comment Edit Controller", () => {
  it("should update an existing comment", async () => {
    // Mock the edit method from your service to return an updated comment
    commentServices.edit.mockResolvedValue(mockUpdatedComment);

    const response = await request(app)
      .put(`${commentTestUrl}/commentId`)
      .send(editCommentData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Comment updated successfully");
    expect(response.body.data.id).toBe("commentId");
    expect(response.body.data.content).toBe("Updated Comment");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    commentServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${commentTestUrl}/commentId`)
      .send(editCommentData);

    expect(response.statusCode).toBe(500);
  });
});
