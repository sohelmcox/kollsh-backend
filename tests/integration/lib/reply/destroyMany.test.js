const { destroyMany } = require("../../../../src/lib/reply");
const { Reply } = require("../../../../src/models");

describe("Reply Destroy Many Service", () => {
  it("should delete multiple replies by their IDs", async () => {
    // Create a mock for the Reply model
    const mockReplyModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the Reply model with the mock model for this test
    jest
      .spyOn(Reply, "deleteMany")
      .mockImplementation(mockReplyModel.deleteMany);

    const replyIdsToDelete = ["replyId1", "replyId2"]; // Replace with valid reply IDs

    const deletedCount = await destroyMany(replyIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockReplyModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: replyIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting replies", async () => {
    // Create a mock for the Reply model
    const mockReplyModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting replies")),
    };

    // Replace the Reply model with the mock model for this test
    jest
      .spyOn(Reply, "deleteMany")
      .mockImplementation(mockReplyModel.deleteMany);

    const replyIdsToDelete = ["replyId1", "replyId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(replyIdsToDelete)).rejects.toThrowError(
      "Error deleting replies",
    );
  });
});
