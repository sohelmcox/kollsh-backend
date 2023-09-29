const { destroyMany } = require("../../../../src/lib/upload");
const { Upload } = require("../../../../src/models");

// Mocking the modules
jest.mock("../../../../src/models", () => ({
  Upload: {
    find: jest.fn(),
    deleteMany: jest.fn(),
  },
}));

jest.mock("../../../../src/utils/upload/cloudinarySDK", () => ({
  destroyManyFiles: jest.fn(),
}));

const { badRequest } = require("../../../../src/utils/error");

describe("destroyMany", () => {
  it("should delete files and return the number of deleted files", async () => {
    // Mock the database responses
    const mockFiles = [
      { _id: "file1", public_id: "public_id_1" },
      { _id: "file2", public_id: "public_id_2" },
    ];

    // Set up the mock functions to return the expected values
    require("../../../../src/models").Upload.find.mockResolvedValue(mockFiles);
    require("../../../../src/utils/upload/cloudinarySDK").destroyManyFiles.mockResolvedValue();

    // Call the function with the IDs of the files to be deleted
    const result = await destroyMany(["file1", "file2"]);

    // Assert that the function returns the expected result
    expect(result).toBe(0);

    // Check if database functions were called with the correct parameters
    expect(require("../../../../src/models").Upload.find).toHaveBeenCalledWith({
      _id: { $in: ["file1", "file2"] },
    });
    expect(
      require("../../../../src/utils/upload/cloudinarySDK").destroyManyFiles,
    ).toHaveBeenCalledWith(["public_id_1", "public_id_2"]);
    expect(
      require("../../../../src/models").Upload.deleteMany,
    ).toHaveBeenCalledWith({
      _id: { $in: ["file1", "file2"] },
    });
  });

  it("should throw an error for invalid file IDs", async () => {
    // Call the function with invalid file IDs
    await expect(destroyMany("invalid")).rejects.toThrowError(
      badRequest("Error deleting files: Invalid Ids provided"),
    );
  });

  // Add more test cases as needed
});
