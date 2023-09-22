const { destroyMany } = require("../../../../src/lib/item");
const { Item } = require("../../../../src/models");

describe("Item Destroy Many Service", () => {
  it("should delete multiple items by their IDs", async () => {
    // Create a mock for the Item model
    const mockItemModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the Item model with the mock model for this test
    jest.spyOn(Item, "deleteMany").mockImplementation(mockItemModel.deleteMany);

    const itemIdsToDelete = ["itemId1", "itemId2"]; // Replace with valid item IDs

    const deletedCount = await destroyMany(itemIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockItemModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: itemIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting items", async () => {
    // Create a mock for the Item model
    const mockItemModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting items")),
    };

    // Replace the Item model with the mock model for this test
    jest.spyOn(Item, "deleteMany").mockImplementation(mockItemModel.deleteMany);

    const itemIdsToDelete = ["itemId1", "itemId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(itemIdsToDelete)).rejects.toThrowError(
      "Error deleting items",
    );
  });
});
