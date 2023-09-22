const request = require("supertest");
const { app } = require("../../../setup/app");
const commentController = require("../../../../src/api/v1/comment/controllers");
const commentServices = require("../../../../src/lib/comment");
const {
  commentTestUrl,
  createCommentData,
  commentTestQuery,
} = require("../../../testSeed/comment");

// Mock the required dependencies
jest.mock("../../../../src/lib/comment", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(commentTestUrl, commentController.find);

describe("Comment Find Controller", () => {
  it("should find comments with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of comments

    commentServices.findAll.mockResolvedValue(createCommentData);

    const response = await request(app)
      .get(commentTestUrl)
      .query(commentTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
