const { edit } = require("../../../../src/lib/reply");
const { Reply } = require("../../../../src/models");
const { updatedReplyData } = require("../../../testSeed/reply");

// Mock the Reply model's methods
jest.mock("../../../../src/models", () => {
  const mockReply = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    Reply: {
      findById: mockReply.findById,
    },
  };
});

describe("Reply Edit Service", () => {
  it("should edit an existing reply", async () => {
    // Mock the findById method to return a reply
    const existingReply = {
      id: "replyId",
      content: "New Reply",
      comment: "string or id",
      priority: 1,
      save: jest.fn(),
    };
    Reply.findById.mockResolvedValue(existingReply);

    const result = await edit("replyId", updatedReplyData);

    // Verify that the findById method was called with the correct ID
    expect(Reply.findById).toHaveBeenCalledWith("replyId");

    // Verify that the reply's properties were updated correctly
    expect(existingReply.content).toBe(updatedReplyData.content);
    expect(existingReply.comment).toBe(updatedReplyData.comment);

    // Verify that the save method was called on the reply instance
    expect(existingReply.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("replyId");
  });

  it("should throw an error if the reply is not found", async () => {
    // Mock the findById method to return null, indicating the reply was not found
    Reply.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentReplyId", updatedReplyData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Reply not found.");
    }
  });
});
