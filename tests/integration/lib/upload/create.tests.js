const { updateOrCreate } = require("../../../../src/lib/upload");
const { Upload } = require("../../../../src/models");
const { newUploadData, existingUpload } = require("../../../testSeed/upload");
// Mock the Upload model's methods
jest.mock("../../../../src/models", () => {
  const mockUpload = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    Upload: {
      findById: mockUpload.findById,
      findOne: mockUpload.findOne,
      create: mockUpload.create,
    },
  };
});

describe("Upload Update or Create Service", () => {
  it("should create a new upload", async () => {
    // Mock the findById method to return null, indicating the upload does not exist
    Upload.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the upload name is not found
    Upload.findOne.mockResolvedValue(null);

    // Mock the create method to return a new upload instance
    const createdUploadInstance = {
      id: "newUploadId",
      ...newUploadData,
      save: jest.fn(),
    };
    Upload.create.mockReturnValue(createdUploadInstance);

    const result = await updateOrCreate("newUploadId", { ...newUploadData });
    // console.log(result);
    expect(result.code).toBe(201);
  });

  it("should throw a badRequest error if the upload name already exists", async () => {
    // Mock the findById method to return null, indicating the upload does not exist
    Upload.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing upload with the same name
    Upload.findOne.mockResolvedValue(existingUpload);

    try {
      await updateOrCreate("newUploadId", newUploadData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe("Upload name already exist");
    }
  });
});
