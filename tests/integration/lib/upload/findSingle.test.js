const { findSingle } = require("../../../../src/lib/upload");
const { Upload } = require("../../../../src/models");
const { newUploadData } = require("../../../testSeed/upload");

// Mock the Upload model's methods
jest.mock("../../../../src/models", () => {
  const mockUpload = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    Upload: {
      findById: mockUpload.findById,
    },
  };
});

describe("Upload Find Single Service", () => {
  it("should find a single upload by ID", async () => {
    // Mock the Upload model's findById method to return a sample upload

    Upload.findById.mockResolvedValue(newUploadData);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(Upload.findById).toHaveBeenCalledWith(params);

    // Verify the result
    expect(result.id).toEqual(params.id);
  });

  it("should throw a notFound error if upload with given ID is not found", async () => {
    // Mock the Upload model's findById method to return null, indicating the upload is not found
    Upload.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2b2529",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("file not found");
      // console.log(error);
    }
  });
});
