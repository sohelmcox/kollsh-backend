const { edit } = require("../../../../src/lib/itemSuggestion");
const { ItemSuggestion } = require("../../../../src/models");
const {
  updatedItemSuggestionData,
} = require("../../../testSeed/itemSuggestion");

// Mock the ItemSuggestion model's methods
jest.mock("../../../../src/models", () => {
  const mockItemSuggestion = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    ItemSuggestion: {
      findById: mockItemSuggestion.findById,
    },
  };
});

describe("ItemSuggestion Edit Service", () => {
  it("should edit an existing itemSuggestion", async () => {
    // Mock the findById method to return a itemSuggestion
    const existingItemSuggestion = {
      id: "557064617465642055756572",
      item: ["54759eb3c090d83494e2d804"],
      categories: ["string or id", "string or id"],
      subcategories: ["string or id", "string or id"],
      brands: ["string or id", "string or id"],
      save: jest.fn(),
    };
    ItemSuggestion.findById.mockResolvedValue(existingItemSuggestion);

    const result = await edit(
      "557064617465642055756572",
      updatedItemSuggestionData,
    );

    // Verify that the findById method was called with the correct ID
    expect(ItemSuggestion.findById).toHaveBeenCalledWith(
      "557064617465642055756572",
    );

    // Verify that the itemSuggestion's properties were updated correctly
    expect(existingItemSuggestion.user).toBe(updatedItemSuggestionData.user);

    // Verify that the save method was called on the itemSuggestion instance
    expect(existingItemSuggestion.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("557064617465642055756572");
  });

  it("should throw an error if the itemSuggestion is not found", async () => {
    // Mock the findById method to return null, indicating the itemSuggestion was not found
    ItemSuggestion.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentItemSuggestionId", updatedItemSuggestionData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("ItemSuggestion not found.");
    }
  });
});
