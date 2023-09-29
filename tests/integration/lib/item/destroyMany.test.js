const { destroyMany } = require("../../../../src/lib/item");
const { Item } = require("../../../../src/models");

// Mocking the database-related modules
jest.mock("../../../../src/models", () => {
  const mockItem = {
    findById: jest.fn(),
    deleteMany: jest.fn(),
  };

  const mockItemDetails = {
    find: jest.fn(),
    deleteMany: jest.fn(),
  };

  const mockComment = {
    find: jest.fn(),
    deleteMany: jest.fn(),
  };

  const mockReply = {
    find: jest.fn(),
    deleteMany: jest.fn(),
  };

  const mockMetadata = {
    deleteMany: jest.fn(),
  };

  return {
    Item: mockItem,
    ItemDetails: mockItemDetails,
    Comment: mockComment,
    Reply: mockReply,
    Metadata: mockMetadata,
  };
});

describe("destroyMany", () => {
  it("should delete items and associated data", async () => {
    // Mock the database responses
    const mockItems = [{ _id: "item1" }, { _id: "item2" }];
    const mockItemDetails = [{ _id: "itemDetail1", metadata: "metadata1" }];
    const mockComments = [{ _id: "comment1" }];
    const mockReplies = [{ _id: "reply1" }];

    // Set up the mock functions to return the expected values
    require("../../../../src/models").Item.findById.mockResolvedValue(
      mockItems,
    );
    require("../../../../src/models").ItemDetails.find.mockResolvedValue(
      mockItemDetails,
    );
    require("../../../../src/models").Comment.find.mockResolvedValue(
      mockComments,
    );
    require("../../../../src/models").Reply.find.mockResolvedValue(mockReplies);

    // Call the function with the IDs of the items to be deleted
    const result = await destroyMany(["item1", "item2"]);

    // Assert that the function returns the expected result
    expect(result.deletedItems).toBe(2);
    expect(result.deletedItemDetails).toBe(1);
    expect(result.deletedComments).toBe(1);
    expect(result.deletedMetadata).toBe(1);
    // Add more assertions based on your specific use case

    // Check if database functions were called with the correct parameters
    expect(
      require("../../../../src/models").Item.findById,
    ).toHaveBeenCalledWith(["item1", "item2"]);
    // Add more assertions for other database functions
  });

  // Add more test cases as needed
});
