const { destroyMany } = require("../../../../src/lib/subcategory");
const { Subcategory } = require("../../../../src/models");

describe("Subcategory Destroy Many Service", () => {
  it("should delete multiple subcategories by their IDs", async () => {
    // Create a mock for the Subcategory model
    const mockSubcategoryModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the Subcategory model with the mock model for this test
    jest
      .spyOn(Subcategory, "deleteMany")
      .mockImplementation(mockSubcategoryModel.deleteMany);

    const subcategoryIdsToDelete = ["subcategoryId1", "subcategoryId2"]; // Replace with valid subcategory IDs

    const deletedCount = await destroyMany(subcategoryIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockSubcategoryModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: subcategoryIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting subcategories", async () => {
    // Create a mock for the Subcategory model
    const mockSubcategoryModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting subcategories")),
    };

    // Replace the Subcategory model with the mock model for this test
    jest
      .spyOn(Subcategory, "deleteMany")
      .mockImplementation(mockSubcategoryModel.deleteMany);

    const subcategoryIdsToDelete = ["subcategoryId1", "subcategoryId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(subcategoryIdsToDelete)).rejects.toThrowError(
      "Error deleting subcategories",
    );
  });
});
