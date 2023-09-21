const { destroyMany } = require("../../../../src/lib/brand");
const { Brand } = require("../../../../src/models");

describe("Brand Destroy Many Service", () => {
  it("should delete multiple brands by their IDs", async () => {
    // Create a mock for the Brand model
    const mockBrandModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the Brand model with the mock model for this test
    jest
      .spyOn(Brand, "deleteMany")
      .mockImplementation(mockBrandModel.deleteMany);

    const brandIdsToDelete = ["brandId1", "brandId2"]; // Replace with valid brand IDs

    const deletedCount = await destroyMany(brandIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockBrandModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: brandIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting brands", async () => {
    // Create a mock for the Brand model
    const mockBrandModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting brands")),
    };

    // Replace the Brand model with the mock model for this test
    jest
      .spyOn(Brand, "deleteMany")
      .mockImplementation(mockBrandModel.deleteMany);

    const brandIdsToDelete = ["brandId1", "brandId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(brandIdsToDelete)).rejects.toThrowError(
      "Error deleting brands",
    );
  });
});
