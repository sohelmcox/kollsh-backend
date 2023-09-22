const request = require("supertest");
const { app } = require("../../../setup/app");
const commentController = require("../../../../src/api/v1/comment/controllers");
const commentServices = require("../../../../src/lib/comment");
const {
  commentTestUrl,
  updatedCommentData,
  newCommentData,
  mockUpdatedComment,
} = require("../../../testSeed/comment");

// Mock service methods
jest.mock("../../../../src/lib/comment", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up Express app and route
app.put(`${commentTestUrl}/:id`, commentController.updateOrCreate);

describe("Comment Update Controller", () => {
  it("should update an existing comment", async () => {
    // Mock the updateOrCreate method from your service to return an updated comment

    commentServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedComment,
      code: 200,
    });

    const response = await request(app)
      .put(`${commentTestUrl}/commentId`)
      .send(updatedCommentData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Comment updated successfully");
    expect(response.body.data.id).toBe("commentId");
    expect(response.body.data.content).toBe("Updated Comment");
  });

  it("should create a new comment if not found", async () => {
    // Mock the updateOrCreate method to create a new comment

    commentServices.updateOrCreate.mockResolvedValue({
      data: newCommentData,
      code: 201,
    });

    const response = await request(app)
      .put(`${commentTestUrl}/nonExistentId`)
      .send(updatedCommentData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Comment created successfully");
    expect(response.body.data.id).toBe("newCommentId");
    expect(response.body.data.content).toBe("New Comment");
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    commentServices.updateOrCreate.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .put(`${commentTestUrl}/commentId`)
      .send(updatedCommentData);

    expect(response.statusCode).toBe(500);
  });
});
