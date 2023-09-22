const { destroyMany } = require("../../../../src/lib/comment");
const { Comment } = require("../../../../src/models");

describe("Comment Destroy Many Service", () => {
  it("should delete multiple comments by their IDs", async () => {
    // Create a mock for the Comment model
    const mockCommentModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the Comment model with the mock model for this test
    jest
      .spyOn(Comment, "deleteMany")
      .mockImplementation(mockCommentModel.deleteMany);

    const commentIdsToDelete = ["commentId1", "commentId2"]; // Replace with valid comment IDs

    const deletedCount = await destroyMany(commentIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockCommentModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: commentIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting comments", async () => {
    // Create a mock for the Comment model
    const mockCommentModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting comments")),
    };

    // Replace the Comment model with the mock model for this test
    jest
      .spyOn(Comment, "deleteMany")
      .mockImplementation(mockCommentModel.deleteMany);

    const commentIdsToDelete = ["commentId1", "commentId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(commentIdsToDelete)).rejects.toThrowError(
      "Error deleting comments",
    );
  });
});
