const { destroyMany } = require("../../../../src/lib/itemSuggestion");
const { ItemSuggestion } = require("../../../../src/models");

describe("ItemSuggestion Destroy Many Service", () => {
  it("should delete multiple itemSuggestions by their IDs", async () => {
    // Create a mock for the ItemSuggestion model
    const mockItemSuggestionModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the ItemSuggestion model with the mock model for this test
    jest
      .spyOn(ItemSuggestion, "deleteMany")
      .mockImplementation(mockItemSuggestionModel.deleteMany);

    const itemSuggestionIdsToDelete = [
      "itemSuggestionId1",
      "itemSuggestionId2",
    ]; // Replace with valid itemSuggestion IDs

    const deletedCount = await destroyMany(itemSuggestionIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockItemSuggestionModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: itemSuggestionIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting itemSuggestions", async () => {
    // Create a mock for the ItemSuggestion model
    const mockItemSuggestionModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting itemSuggestions")),
    };

    // Replace the ItemSuggestion model with the mock model for this test
    jest
      .spyOn(ItemSuggestion, "deleteMany")
      .mockImplementation(mockItemSuggestionModel.deleteMany);

    const itemSuggestionIdsToDelete = [
      "itemSuggestionId1",
      "itemSuggestionId2",
    ];

    // Expecting the service to throw an error
    await expect(destroyMany(itemSuggestionIdsToDelete)).rejects.toThrowError(
      "Error deleting itemSuggestions",
    );
  });
});
