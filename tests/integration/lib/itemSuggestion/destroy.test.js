const { destroy } = require("../../../../src/lib/itemSuggestion");
const { ItemSuggestion } = require("../../../../src/models");

// Mock the ItemSuggestion model's methods
jest.mock("../../../../src/models", () => {
  const mockItemSuggestion = {
    findById: jest.fn(),
  };

  return {
    ItemSuggestion: {
      findById: mockItemSuggestion.findById,
    },
  };
});

describe("ItemSuggestion Destroy Service", () => {
  it("should destroy an existing itemSuggestion", async () => {
    // Mock the findById method to return a itemSuggestion
    const mockItemSuggestionInstance = {
      deleteOne: jest.fn(),
    };
    ItemSuggestion.findById.mockResolvedValue(mockItemSuggestionInstance);

    await destroy("itemSuggestionId");

    // Verify that the findById method was called with the correct ID
    expect(ItemSuggestion.findById).toHaveBeenCalledWith("itemSuggestionId");

    // Verify that the deleteOne method was called on the itemSuggestion instance
    expect(mockItemSuggestionInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the itemSuggestion is not found", async () => {
    // Mock the findById method to return null, indicating the itemSuggestion was not found
    ItemSuggestion.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent itemSuggestion
    try {
      await destroy("nonExistentItemSuggestionId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("itemSuggestion not found.");
      expect(error.status).toBe(404);
    }
  });
});
