const { destroyMany } = require("../../../../src/lib/attributeValue");
const { AttributeValue } = require("../../../../src/models");

describe("AttributeValue Destroy Many Service", () => {
  it("should delete multiple attributeValues by their IDs", async () => {
    // Create a mock for the AttributeValue model
    const mockAttributeValueModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the AttributeValue model with the mock model for this test
    jest
      .spyOn(AttributeValue, "deleteMany")
      .mockImplementation(mockAttributeValueModel.deleteMany);

    const attributeValueIdsToDelete = [
      "attributeValueId1",
      "attributeValueId2",
    ]; // Replace with valid attributeValue IDs

    const deletedCount = await destroyMany(attributeValueIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockAttributeValueModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: attributeValueIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting attributeValues", async () => {
    // Create a mock for the AttributeValue model
    const mockAttributeValueModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting attributeValues")),
    };

    // Replace the AttributeValue model with the mock model for this test
    jest
      .spyOn(AttributeValue, "deleteMany")
      .mockImplementation(mockAttributeValueModel.deleteMany);

    const attributeValueIdsToDelete = [
      "attributeValueId1",
      "attributeValueId2",
    ];

    // Expecting the service to throw an error
    await expect(destroyMany(attributeValueIdsToDelete)).rejects.toThrowError(
      "Error deleting attributeValues",
    );
  });
});
