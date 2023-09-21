const { destroyMany } = require("../../../../src/lib/category");
const { Category } = require("../../../../src/models");

describe("Category Destroy Many Service", () => {
  it("should delete multiple categories by their IDs", async () => {
    // Create a mock for the Category model
    const mockCategoryModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the Category model with the mock model for this test
    jest
      .spyOn(Category, "deleteMany")
      .mockImplementation(mockCategoryModel.deleteMany);

    const categoryIdsToDelete = ["categoryId1", "categoryId2"]; // Replace with valid category IDs

    const deletedCount = await destroyMany(categoryIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockCategoryModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: categoryIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting categories", async () => {
    // Create a mock for the Category model
    const mockCategoryModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting categories")),
    };

    // Replace the Category model with the mock model for this test
    jest
      .spyOn(Category, "deleteMany")
      .mockImplementation(mockCategoryModel.deleteMany);

    const categoryIdsToDelete = ["categoryId1", "categoryId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(categoryIdsToDelete)).rejects.toThrowError(
      "Error deleting categories",
    );
  });
});
