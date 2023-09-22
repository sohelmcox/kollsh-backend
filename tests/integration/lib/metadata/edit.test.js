const { edit } = require("../../../../src/lib/metadata");
const { Metadata } = require("../../../../src/models");
const { updatedMetadataData } = require("../../../testSeed/metadata");

// Mock the Metadata model's methods
jest.mock("../../../../src/models", () => {
  const mockMetadata = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    Metadata: {
      findById: mockMetadata.findById,
    },
  };
});

describe("Metadata Edit Service", () => {
  it("should edit an existing metadata", async () => {
    // Mock the findById method to return a metadata
    const existingMetadata = {
      id: "metadataId",
      title: "Test Metadata",
      description: "string",
      image: "string or id",
      keywords: ["string"],
      save: jest.fn(),
    };
    Metadata.findById.mockResolvedValue(existingMetadata);

    const result = await edit("metadataId", updatedMetadataData);

    // Verify that the findById method was called with the correct ID
    expect(Metadata.findById).toHaveBeenCalledWith("metadataId");

    // Verify that the metadata's properties were updated correctly
    expect(existingMetadata.title).toBe(updatedMetadataData.title);
    expect(existingMetadata.description).toBe(updatedMetadataData.description);
    expect(existingMetadata.image).toBe(updatedMetadataData.image);
    expect(existingMetadata.keywords).toEqual(updatedMetadataData.keywords);

    // Verify that the save method was called on the metadata instance
    expect(existingMetadata.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("metadataId");
  });

  it("should throw an error if the metadata is not found", async () => {
    // Mock the findById method to return null, indicating the metadata was not found
    Metadata.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentMetadataId", updatedMetadataData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Metadata not found.");
    }
  });
});
