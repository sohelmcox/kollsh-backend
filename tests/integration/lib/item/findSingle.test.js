const { findSingle } = require("../../../../src/lib/item");
const { Item } = require("../../../../src/models");
const { newItemData } = require("../../../testSeed/item");

// Mock the Item model's methods
jest.mock("../../../../src/models", () => {
  const mockItem = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    Item: {
      findById: mockItem.findById,
    },
  };
});

describe("Item Find Single Service", () => {
  it("should find a single item by ID", async () => {
    // Mock the Item model's findById method to return a sample item

    Item.findById.mockResolvedValue(newItemData);

    const params = {
      id: "newItemId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(Item.findById).toHaveBeenCalledWith("newItemId");

    // Verify the result
    expect(result).toEqual(newItemData);
    expect(result.name).toEqual("New Item");
  });

  it("should throw a notFound error if item with given ID is not found", async () => {
    // Mock the Item model's findById method to return null, indicating the item is not found
    Item.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("Item not found");
      // console.log(error);
    }
  });
});
