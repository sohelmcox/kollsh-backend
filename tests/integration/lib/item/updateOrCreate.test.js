const { updateOrCreate } = require("../../../../src/lib/item");
const { Item } = require("../../../../src/models");
const {
  newItemData,
  updatedItemData,
  existingItemData,
} = require("../../../testSeed/item");
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
  it("should create a new item if it does not exist", async () => {
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
  it("should update an existing item if it exists", async () => {
    // Mock an existing item
    const existingItem = {
      id: "existingItemId",
      name: "Updated Item",
      slug: "updated-item",
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
      overwrite: jest.fn(),
      save: jest.fn(),
    };
    Item.findById.mockResolvedValue(existingItem);

    // Mock the findOne method to return null, indicating the item name is not found
    Item.findOne.mockResolvedValue(null);

    const result = await updateOrCreate("existingItemId", updatedItemData);
    // Verify that the findById method was called with the correct ID
    expect(Item.findById).toHaveBeenCalledWith("existingItemId");

    // Verify that the overwrite and save methods were called on the existing item
    expect(existingItem.overwrite).toHaveBeenCalledWith({
      name: updatedItemData.name,
      slug: updatedItemData.slug,
      released: updatedItemData.released,
      thumbnail: updatedItemData.thumbnail,
      subcategory: updatedItemData.subcategory,
      state: updatedItemData.state,
      cities: updatedItemData.cities,
      price: updatedItemData.price,
      negotiable: updatedItemData.negotiable,
      is_argent: updatedItemData.is_argent,
      brand: updatedItemData.brand,
      seller: updatedItemData.seller,
      description: updatedItemData.description,
    });
    expect(existingItem.save).toHaveBeenCalled();

    // Verify the result
    // expect(result.data).toEqual({ ...existingItem });
    expect(result.code).toBe(200);
  });
});
