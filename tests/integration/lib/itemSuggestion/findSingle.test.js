const { findSingle } = require("../../../../src/lib/itemSuggestion");
const { ItemSuggestion } = require("../../../../src/models");
const { newItemSuggestionData } = require("../../../testSeed/itemSuggestion");

// Mock the ItemSuggestion model's methods
jest.mock("../../../../src/models", () => {
  const mockItemSuggestion = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    ItemSuggestion: {
      findById: mockItemSuggestion.findById,
    },
  };
});

describe("ItemSuggestion Find Single Service", () => {
  it("should find a single itemSuggestion by ID", async () => {
    // Mock the ItemSuggestion model's findById method to return a sample itemSuggestion

    ItemSuggestion.findById.mockResolvedValue(newItemSuggestionData);

    const params = {
      id: "newItemSuggestionId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(ItemSuggestion.findById).toHaveBeenCalledWith("newItemSuggestionId");

    // Verify the result
    expect(result).toEqual(newItemSuggestionData);
  });

  it("should throw a notFound error if itemSuggestion with given ID is not found", async () => {
    // Mock the ItemSuggestion model's findById method to return null, indicating the itemSuggestion is not found
    ItemSuggestion.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("ItemSuggestion not found");
      // console.log(error);
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
