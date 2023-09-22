const { edit } = require("../../../../src/lib/item");
const { Item } = require("../../../../src/models");
const { updatedItemData } = require("../../../testSeed/item");

// Mock the Item model's methods
jest.mock("../../../../src/models", () => {
  const mockItem = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    Item: {
      findById: mockItem.findById,
    },
  };
});

describe("Item Edit Service", () => {
  it("should edit an existing item", async () => {
    // Mock the findById method to return a item
    const existingItem = {
      id: "itemId",
      name: "Old Item",
      slug: "old-item",
      released: "2023-09-22",
      thumbnail: "string or id",
      subcategory: "string or id",
      state: "string or id",
      cities: ["string or id", "string or id"],
      price: 0,
      negotiable: true,
      is_argent: true,
      brand: "string or id",
      item: "string or id",
      description: "string",
      images: ["string or id", "string or id"],
      contactNumber: "123456789",
      whatsappNumber: "123456789",
      email: "user@example.com",
      address: "string",
      latitude: "123456789",
      longitude: "123456789",
      metadata: "string or id",
      save: jest.fn(),
    };
    Item.findById.mockResolvedValue(existingItem);

    const result = await edit("itemId", updatedItemData);

    // Verify that the findById method was called with the correct ID
    expect(Item.findById).toHaveBeenCalledWith("itemId");

    // Verify that the item's properties were updated correctly
    expect(existingItem.name).toBe(updatedItemData.name);
    expect(existingItem.slug).toBe(updatedItemData.slug);
    expect(existingItem.thumbnail).toBe(updatedItemData.thumbnail);
    expect(existingItem.negotiable).toBe(updatedItemData.negotiable);
    expect(existingItem.priority).toBe(updatedItemData.priority);

    // Verify that the save method was called on the item instance
    expect(existingItem.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("itemId");
  });

  it("should throw an error if the item is not found", async () => {
    // Mock the findById method to return null, indicating the item was not found
    Item.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentItemId", updatedItemData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Item not found.");
    }
  });
});
