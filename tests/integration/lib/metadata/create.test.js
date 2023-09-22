const { create } = require("../../../../src/lib/metadata");
const { Metadata } = require("../../../../src/models");
const {
  newMetadataData,
  existingMetadata,
} = require("../../../testSeed/metadata");
// Mock the Metadata model's methods
jest.mock("../../../../src/models", () => {
  const mockMetadata = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    Metadata: {
      findById: mockMetadata.findById,
      findOne: mockMetadata.findOne,
      create: mockMetadata.create,
    },
  };
});

describe("Metadata Update or Create Service", () => {
  it("should create a new metadata", async () => {
    // Mock the findById method to return null, indicating the metadata does not exist
    Metadata.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the metadata name is not found
    Metadata.findOne.mockResolvedValue(null);

    // Mock the create method to return a new metadata instance
    const createdMetadataInstance = {
      id: "newMetadataId",
      ...newMetadataData,
      save: jest.fn(),
    };
    Metadata.create.mockReturnValue(createdMetadataInstance);

    const result = await create({
      ...newMetadataData,
    });
    // console.log(result);

    expect(result.code).toBe(201);
  });
});
