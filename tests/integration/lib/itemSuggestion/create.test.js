const { updateOrCreate } = require("../../../../src/lib/itemSuggestion");
const { ItemSuggestion } = require("../../../../src/models");
const {
  newItemSuggestionData,
  existingItemSuggestion,
} = require("../../../testSeed/itemSuggestion");
// Mock the ItemSuggestion model's methods
jest.mock("../../../../src/models", () => {
  const mockItemSuggestion = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    ItemSuggestion: {
      findById: mockItemSuggestion.findById,
      findOne: mockItemSuggestion.findOne,
      create: mockItemSuggestion.create,
    },
  };
});

describe("ItemSuggestion Update or Create Service", () => {
  it("should create a new itemSuggestion", async () => {
    // Mock the findById method to return null, indicating the itemSuggestion does not exist
    ItemSuggestion.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the itemSuggestion name is not found
    ItemSuggestion.findOne.mockResolvedValue(null);

    // Mock the create method to return a new itemSuggestion instance
    const createdItemSuggestionInstance = {
      id: "newItemSuggestionId",
      ...newItemSuggestionData,
      save: jest.fn(),
    };
    ItemSuggestion.create.mockReturnValue(createdItemSuggestionInstance);

    const result = await updateOrCreate("newItemSuggestionId", {
      ...newItemSuggestionData,
    });
    // console.log(result);
    expect(result.code).toBe(201);
  });
});
