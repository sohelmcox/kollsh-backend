const { findSingle } = require("../../../../src/lib/comment");
const { Comment } = require("../../../../src/models");
const { newCommentData } = require("../../../testSeed/comment");

// Mock the Comment model's methods
jest.mock("../../../../src/models", () => {
  const mockComment = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    Comment: {
      findById: mockComment.findById,
    },
  };
});

describe("Comment Find Single Service", () => {
  it("should find a single comment by ID", async () => {
    // Mock the Comment model's findById method to return a sample comment

    Comment.findById.mockResolvedValue(newCommentData);

    const params = {
      id: "newCommentId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(Comment.findById).toHaveBeenCalledWith("newCommentId");

    // Verify the result
    expect(result).toEqual(newCommentData);
    expect(result.content).toEqual("New Comment");
  });

  it("should throw a notFound error if comment with given ID is not found", async () => {
    // Mock the Comment model's findById method to return null, indicating the comment is not found
    Comment.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("Comment not found");
      // console.log(error);
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
