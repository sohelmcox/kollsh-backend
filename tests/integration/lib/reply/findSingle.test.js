const { findSingle } = require("../../../../src/lib/reply");
const { Reply, Comment } = require("../../../../src/models");
const { notFound } = require("../../../../src/utils/error");

// Mock the required models and methods
jest.mock("../../../../src/models/Reply");
jest.mock("../../../../src/models/Comment");

describe("findSingle Service", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock call records between tests
  });

  it("should find a single reply by ID and populate fields", async () => {
    const mockReplyId = "mock-reply-id";
    const mockCommentId = "mock-comment-id";
    const mockReplyData = {
      // Mock reply data here
      _id: mockReplyId,
      comment: mockCommentId,
    };

    // Mock the findById method of Reply model
    Reply.findById.mockResolvedValue(mockReplyData);

    // Mock the findById method of Comment model
    Comment.findById.mockResolvedValue({ _id: mockCommentId });
    const response = await findSingle({ id: mockReplyId });
    // console.log(response.body);
    // Assertions
    expect(Reply.findById).toHaveBeenCalledWith(mockReplyId);
    expect(Comment.findById).toHaveBeenCalledWith(mockCommentId);
  });

  it("should throw notFound error when reply is not found", async () => {
    const mockReplyId = "nonexistent-reply-id";
    const mockPopulateFields = [];

    // Mock the findById method of Reply model to return null
    Reply.findById.mockResolvedValue(null);

    // Call the findSingle service and expect it to throw an error
    try {
      await findSingle({ id: mockReplyId, populate: mockPopulateFields });
      // If no error is thrown, fail the test
      fail("Expected an error, but no error was thrown.");
    } catch (error) {
      // Assertions
      expect(error.message).toBe("Reply Not Found"); // Check the error message
      expect(Reply.findById).toHaveBeenCalledWith(mockReplyId);
      expect(Comment.findById).not.toHaveBeenCalled(); // Comment.findById should not have been called
    }
  });

  it("should throw notFound error when comment is not found", async () => {
    const mockReplyId = "mock-reply-id";
    const mockCommentId = "nonexistent-comment-id";
    const mockReplyData = {
      _id: mockReplyId,
      comment: mockCommentId,
    };
    const mockPopulateFields = [];

    // Mock the findById method of Reply model
    Reply.findById.mockResolvedValue(mockReplyData);

    // Mock the findById method of Comment model to return null
    Comment.findById.mockResolvedValue(null);

    // Call the findSingle service and expect it to throw an error
    try {
      await findSingle({ id: mockReplyId, populate: mockPopulateFields });
      // If no error is thrown, fail the test
      fail("Expected an error, but no error was thrown.");
    } catch (error) {
      // Assertions
      expect(error.message).toBe("This Comment Is Not Found"); // Check the comment error message
      expect(Reply.findById).toHaveBeenCalledWith(mockReplyId);
      expect(Comment.findById).toHaveBeenCalledWith(mockCommentId);
    }
  });

  // Add more test cases for other scenarios as needed
});
