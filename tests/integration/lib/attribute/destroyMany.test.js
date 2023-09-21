const { destroyMany } = require("../../../../src/lib/attribute");
const { Attribute } = require("../../../../src/models");

describe("Attribute Destroy Many Service", () => {
  it("should delete multiple attributes by their IDs", async () => {
    // Create a mock for the Attribute model
    const mockAttributeModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the Attribute model with the mock model for this test
    jest
      .spyOn(Attribute, "deleteMany")
      .mockImplementation(mockAttributeModel.deleteMany);

    const attributeIdsToDelete = ["attributeId1", "attributeId2"]; // Replace with valid attribute IDs

    const deletedCount = await destroyMany(attributeIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockAttributeModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: attributeIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting attributes", async () => {
    // Create a mock for the Attribute model
    const mockAttributeModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting attributes")),
    };

    // Replace the Attribute model with the mock model for this test
    jest
      .spyOn(Attribute, "deleteMany")
      .mockImplementation(mockAttributeModel.deleteMany);

    const attributeIdsToDelete = ["attributeId1", "attributeId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(attributeIdsToDelete)).rejects.toThrowError(
      "Error deleting attributes",
    );
  });
});
