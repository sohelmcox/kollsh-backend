const { destroy } = require("../../../../src/lib/item");
const { Item } = require("../../../../src/models");

// Mock the Item model's methods
jest.mock("../../../../src/models", () => {
  const mockItem = {
    findById: jest.fn(),
  };

  return {
    Item: {
      findById: mockItem.findById,
    },
  };
});

describe("Item Destroy Service", () => {
  it("should destroy an existing item", async () => {
    // Mock the findById method to return a item
    const mockItemInstance = {
      deleteOne: jest.fn(),
      findOne: jest.fn(),
    };
    Item.findById.mockResolvedValue(mockItemInstance);

    await destroy("651481fb16b417cab5c59f83");

    // Verify that the findById method was called with the correct ID
    expect(Item.findById).toHaveBeenCalledWith("651481fb16b417cab5c59f83");

    // Verify that the deleteOne method was called on the item instance
    expect(mockItemInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the item is not found", async () => {
    // Mock the findById method to return null, indicating the item was not found
    Item.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent item
    try {
      await destroy("nonExistentItemId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("item not found.");
      expect(error.status).toBe(404);
    }
  });
});
