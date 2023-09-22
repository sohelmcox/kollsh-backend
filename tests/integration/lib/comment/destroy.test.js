const { destroy } = require("../../../../src/lib/comment");
const { Comment } = require("../../../../src/models");

// Mock the Comment model's methods
jest.mock("../../../../src/models", () => {
  const mockComment = {
    findById: jest.fn(),
  };

  return {
    Comment: {
      findById: mockComment.findById,
    },
  };
});

describe("Comment Destroy Service", () => {
  it("should destroy an existing comment", async () => {
    // Mock the findById method to return a comment
    const mockCommentInstance = {
      deleteOne: jest.fn(),
    };
    Comment.findById.mockResolvedValue(mockCommentInstance);

    await destroy("commentId");

    // Verify that the findById method was called with the correct ID
    expect(Comment.findById).toHaveBeenCalledWith("commentId");

    // Verify that the deleteOne method was called on the comment instance
    expect(mockCommentInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the comment is not found", async () => {
    // Mock the findById method to return null, indicating the comment was not found
    Comment.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent comment
    try {
      await destroy("nonExistentCommentId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Comment not found.");
      expect(error.status).toBe(404);
    }
  });
});
