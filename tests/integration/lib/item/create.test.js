const { updateOrCreate } = require("../../../../src/lib/item");
const { Item } = require("../../../../src/models");
const { newItemData, existingItem } = require("../../../testSeed/item");
// Mock the Item model's methods
jest.mock("../../../../src/models", () => {
  const mockItem = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    Item: {
      findById: mockItem.findById,
      findOne: mockItem.findOne,
      create: mockItem.create,
    },
  };
});

describe("Item Update or Create Service", () => {
  it("should create a new item", async () => {
    // Mock the findById method to return null, indicating the item does not exist
    Item.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the item name is not found
    Item.findOne.mockResolvedValue(null);

    // Mock the create method to return a new item instance
    const createdItemInstance = {
      id: "newItemId",
      ...newItemData,
      save: jest.fn(),
    };
    Item.create.mockReturnValue(createdItemInstance);

    const result = await updateOrCreate("newItemId", { ...newItemData });
    // console.log(result);
    expect(result.code).toBe(201);
  });
});
