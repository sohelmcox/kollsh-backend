const { destroyMany } = require("../../../../src/lib/metadata");
const { Metadata } = require("../../../../src/models");

describe("Metadata Destroy Many Service", () => {
  it("should delete multiple metadata by their IDs", async () => {
    // Create a mock for the Metadata model
    const mockMetadataModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the Metadata model with the mock model for this test
    jest
      .spyOn(Metadata, "deleteMany")
      .mockImplementation(mockMetadataModel.deleteMany);

    const metadataIdsToDelete = ["metadataId1", "metadataId2"]; // Replace with valid metadata IDs

    const deletedCount = await destroyMany(metadataIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockMetadataModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: metadataIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting metadata", async () => {
    // Create a mock for the Metadata model
    const mockMetadataModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting metadata")),
    };

    // Replace the Metadata model with the mock model for this test
    jest
      .spyOn(Metadata, "deleteMany")
      .mockImplementation(mockMetadataModel.deleteMany);

    const metadataIdsToDelete = ["metadataId1", "metadataId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(metadataIdsToDelete)).rejects.toThrowError(
      "Error deleting metadata",
    );
  });
});
