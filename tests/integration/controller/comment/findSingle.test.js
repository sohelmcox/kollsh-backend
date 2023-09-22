const request = require("supertest");
const { app } = require("../../../setup/app");
const commentController = require("../../../../src/api/v1/comment/controllers");
const commentServices = require("../../../../src/lib/comment");
const { commentTestUrl, mockComment } = require("../../../testSeed/comment");

// Mock service methods
jest.mock("../../../../src/lib/comment", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${commentTestUrl}/:id`, commentController.findSingle);

describe("Comment FindSingle Controller", () => {
  it("should find a single comment by ID", async () => {
    // Mock the findSingle method from your service to return a comment

    commentServices.findSingle.mockResolvedValue(mockComment);

    const response = await request(app).get(`${commentTestUrl}/commentId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("commentId");
    expect(response.body.data.content).toBe("Test Comment");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    commentServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${commentTestUrl}/commentId`);

    expect(response.statusCode).toBe(500);
  });
});
