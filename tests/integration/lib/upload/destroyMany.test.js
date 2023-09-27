const { destroyMany } = require("../../../../src/lib/upload");
const { Upload } = require("../../../../src/models");

describe("Upload Destroy Many Service", () => {
  it("should delete multiple uploads by their IDs", async () => {
    // Create a mock for the Upload model
    const mockUploadModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the Upload model with the mock model for this test
    jest
      .spyOn(Upload, "deleteMany")
      .mockImplementation(mockUploadModel.deleteMany);

    const uploadIdsToDelete = ["uploadId1", "uploadId2"]; // Replace with valid upload IDs

    const deletedCount = await destroyMany(uploadIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockUploadModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: uploadIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting uploads", async () => {
    // Create a mock for the Upload model
    const mockUploadModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting uploads")),
    };

    // Replace the Upload model with the mock model for this test
    jest
      .spyOn(Upload, "deleteMany")
      .mockImplementation(mockUploadModel.deleteMany);

    const uploadIdsToDelete = ["uploadId1", "uploadId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(uploadIdsToDelete)).rejects.toThrowError(
      "Error deleting uploads",
    );
  });
});
