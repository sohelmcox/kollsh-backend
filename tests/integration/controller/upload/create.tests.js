const request = require("supertest");
const { app } = require("../../../setup/app");
const uploadController = require("../../../../src/api/v1/upload/controllers");
const uploadService = require("../../../../src/lib/upload");
const { uploadTestUrl, uploadTestData } = require("../../../testSeed/upload");
// Mock service methods
jest.mock("../../../../src/lib/upload", () => ({
  create: jest.fn(),
}));

// Set up route
app.post(uploadTestUrl, uploadController.create);

describe("create Controller", () => {
  it("should create a new upload successfully", async () => {
    // Mock the create function from uploadService to return a result
    const mockResult = { fileId: "123", fileName: "example.jpg" };
    uploadService.create.mockResolvedValue(mockResult);

    const requestBody = {
      folderName: "uploads",
      width: 100,
      height: 100,
    };

    const response = await request(app)
      .post(uploadTestUrl)
      .field("folderName", requestBody.folderName)
      .field("width", requestBody.width)
      .field("height", requestBody.height)
      .attach("files", "./dkakin.jpg");

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Successfully Uploaded File");
    expect(response.body.data).toEqual(mockResult);
  });

  it("should handle errors and call the next middleware", async () => {
    // Mock the create function from uploadService to throw an error
    const errorMessage = "An error occurred during upload";
    uploadService.create.mockRejectedValue(new Error(errorMessage));

    const requestBody = {
      folderName: "uploads",
      width: 100,
      height: 100,
    };

    const nextMock = jest.fn();

    const response = await request(app)
      .post("/create")
      .field("folderName", requestBody.folderName)
      .field("width", requestBody.width)
      .field("height", requestBody.height)
      .attach("files", "./dkakin.jpg");

    expect(response.status).toBe(500); // Adjust the status code as needed
    expect(nextMock).toHaveBeenCalledWith(expect.any(Error));
  });
});
