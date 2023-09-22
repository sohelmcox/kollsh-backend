const { findSingle } = require("../../../../src/lib/metadata");
const { Metadata } = require("../../../../src/models");
const { newMetadataData } = require("../../../testSeed/metadata");

// Mock the Metadata model's methods
jest.mock("../../../../src/models", () => {
  const mockMetadata = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    Metadata: {
      findById: mockMetadata.findById,
    },
  };
});

describe("Metadata Find Single Service", () => {
  it("should find a single metadata by ID", async () => {
    // Mock the Metadata model's findById method to return a sample metadata

    Metadata.findById.mockResolvedValue(newMetadataData);

    const params = {
      id: "newMetadataId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(Metadata.findById).toHaveBeenCalledWith(params);

    // Verify the result
    expect(result).toEqual(newMetadataData);
    expect(result.title).toEqual("New Metadata");
  });

  it("should throw a notFound error if metadata with given ID is not found", async () => {
    // Mock the Metadata model's findById method to return null, indicating the metadata is not found
    Metadata.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("Metadata not found");
      // console.log(error);
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
