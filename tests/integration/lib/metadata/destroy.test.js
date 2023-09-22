const { destroy } = require("../../../../src/lib/metadata");
const { Metadata } = require("../../../../src/models");

// Mock the Metadata model's methods
jest.mock("../../../../src/models", () => {
  const mockMetadata = {
    findById: jest.fn(),
  };

  return {
    Metadata: {
      findById: mockMetadata.findById,
    },
  };
});

describe("Metadata Destroy Service", () => {
  it("should destroy an existing metadata", async () => {
    // Mock the findById method to return a metadata
    const mockMetadataInstance = {
      deleteOne: jest.fn(),
    };
    Metadata.findById.mockResolvedValue(mockMetadataInstance);

    await destroy("metadataId");

    // Verify that the findById method was called with the correct ID
    expect(Metadata.findById).toHaveBeenCalledWith("metadataId");

    // Verify that the deleteOne method was called on the metadata instance
    expect(mockMetadataInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the metadata is not found", async () => {
    // Mock the findById method to return null, indicating the metadata was not found
    Metadata.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent metadata
    try {
      await destroy("nonExistentMetadataId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("metadata not found.");
      expect(error.status).toBe(404);
    }
  });
});
