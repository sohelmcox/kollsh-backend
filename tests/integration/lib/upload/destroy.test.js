const { destroy } = require("../../../../src/lib/upload");
const { Upload } = require("../../../../src/models");

// Mock the Upload model's methods
jest.mock("../../../../src/models", () => {
  const mockUpload = {
    findById: jest.fn(),
  };

  return {
    Upload: {
      findById: mockUpload.findById,
    },
  };
});

describe("Upload Destroy Service", () => {
  it("should destroy an existing upload", async () => {
    // Mock the findById method to return a upload
    const mockUploadInstance = {
      deleteOne: jest.fn(),
    };
    Upload.findById.mockResolvedValue(mockUploadInstance);

    await destroy("6502a59b35d01ff95a2c2527");

    // Verify that the findById method was called with the correct ID
    expect(Upload.findById).toHaveBeenCalledWith("6502a59b35d01ff95a2c2527");

    // Verify that the deleteOne method was called on the upload instance
    expect(mockUploadInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the upload is not found", async () => {
    // Mock the findById method to return null, indicating the upload was not found
    Upload.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent upload
    try {
      await destroy("nonExistentUploadId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message.message).toBe("file is not found");
    }
  });
});
