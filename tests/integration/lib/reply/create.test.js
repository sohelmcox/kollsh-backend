const { create: createReply } = require("../../../../src/lib/reply");
const { Reply } = require("../../../../src/models");
const { newReplyData, existingReply } = require("../../../testSeed/reply");
// Mock the Reply model's methods
jest.mock("../../../../src/models", () => {
  const mockReply = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    Reply: {
      findById: mockReply.findById,
      findOne: mockReply.findOne,
      create: mockReply.create,
    },
  };
});

describe("Reply Update or Create Service", () => {
  it("should create a new reply", async () => {
    // Mock the findById method to return null, indicating the reply does not exist
    Reply.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the reply name is not found
    Reply.findOne.mockResolvedValue(null);

    // Mock the create method to return a new reply instance
    const createdReplyInstance = {
      id: "newReplyId",
      ...newReplyData,
      save: jest.fn(),
    };
    Reply.create.mockReturnValue(createdReplyInstance);

    const result = await createReply({ ...newReplyData });
    console.log(result);
    expect(result.id).toBe("newReplyId");
  });
});
