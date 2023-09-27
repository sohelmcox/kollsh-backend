const { updateOrCreate } = require("../../../../src/lib/itemSuggestion");
const { ItemSuggestion } = require("../../../../src/models");
const {
  newItemSuggestionData,
  updatedItemSuggestionData,
  existingItemSuggestionData,
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
  it("should create a new itemSuggestion if it does not exist", async () => {
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
  it("should update an existing itemSuggestion if it exists", async () => {
    // Mock an existing itemSuggestion
    const existingItemSuggestion = {
      id: "6502a59b35d01ff95a2c2528",
      user: "6502a59b35d01ff95a2c2527",
      item: ["54759eb3c090d83494e2d804"],
      subcategories: ["string or id", "string or id"],
      brands: ["string or id", "string or id"],
      overwrite: jest.fn(),
      save: jest.fn(),
    };
    ItemSuggestion.findById.mockResolvedValue(existingItemSuggestion);

    // Mock the findOne method to return null, indicating the itemSuggestion name is not found
    ItemSuggestion.findOne.mockResolvedValue(null);

    const result = await updateOrCreate(
      "6502a59b35d01ff95a2c2528",
      updatedItemSuggestionData,
    );

    // Verify that the findById method was called with the correct ID
    expect(ItemSuggestion.findById).toHaveBeenCalledWith(
      "6502a59b35d01ff95a2c2528",
    );

    // Verify that the overwrite and save methods were called on the existing itemSuggestion
    expect(existingItemSuggestion.overwrite).toHaveBeenCalledWith({
      user: updatedItemSuggestionData.user,
      item: updatedItemSuggestionData.item,
      subcategories: updatedItemSuggestionData.subcategories,
      brands: updatedItemSuggestionData.brands,
    });
    expect(existingItemSuggestion.save).toHaveBeenCalled();

    // Verify the result

    expect(result.code).toBe(200);
  });
});
