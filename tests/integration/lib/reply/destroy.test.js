const { destroy } = require("../../../../src/lib/reply");
const { Reply } = require("../../../../src/models");

// Mock the Reply model's methods
jest.mock("../../../../src/models", () => {
  const mockReply = {
    findById: jest.fn(),
  };

  return {
    Reply: {
      findById: mockReply.findById,
    },
  };
});

describe("Reply Destroy Service", () => {
  it("should destroy an existing reply", async () => {
    // Mock the findById method to return a reply
    const mockReplyInstance = {
      deleteOne: jest.fn(),
    };
    Reply.findById.mockResolvedValue(mockReplyInstance);

    await destroy("replyId");

    // Verify that the findById method was called with the correct ID
    expect(Reply.findById).toHaveBeenCalledWith("replyId");

    // Verify that the deleteOne method was called on the reply instance
    expect(mockReplyInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the reply is not found", async () => {
    // Mock the findById method to return null, indicating the reply was not found
    Reply.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent reply
    try {
      await destroy("nonExistentReplyId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Reply not found.");
      expect(error.status).toBe(404);
    }
  });
});
