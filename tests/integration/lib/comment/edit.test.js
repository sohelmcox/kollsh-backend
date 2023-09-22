const { edit } = require("../../../../src/lib/comment");
const { Comment } = require("../../../../src/models");
const { updatedCommentData } = require("../../../testSeed/comment");

// Mock the Comment model's methods
jest.mock("../../../../src/models", () => {
  const mockComment = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    Comment: {
      findById: mockComment.findById,
    },
  };
});

describe("Comment Edit Service", () => {
  it("should edit an existing comment", async () => {
    // Mock the findById method to return a comment
    const existingComment = {
      id: "commentId",
      name: "Old Comment",
      itemDetails: "itemDetails",
      priority: 1,
      save: jest.fn(),
    };
    Comment.findById.mockResolvedValue(existingComment);

    const result = await edit("commentId", updatedCommentData);

    // Verify that the findById method was called with the correct ID
    expect(Comment.findById).toHaveBeenCalledWith("commentId");

    // Verify that the comment's properties were updated correctly
    expect(existingComment.content).toBe(updatedCommentData.content);
    expect(existingComment.priority).toBe(updatedCommentData.priority);

    // Verify that the save method was called on the comment instance
    expect(existingComment.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("commentId");
  });

  it("should throw an error if the comment is not found", async () => {
    // Mock the findById method to return null, indicating the comment was not found
    Comment.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentCommentId", updatedCommentData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Comment not found.");
    }
  });
});
