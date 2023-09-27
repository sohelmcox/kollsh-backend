const request = require("supertest");
const { app } = require("../../../setup/app");
const uploadController = require("../../../../src/api/v1/upload/controllers");
const uploadServices = require("../../../../src/lib/upload");
const {
  uploadTestUrl,
  createUploadData,
  uploadTestQuery,
} = require("../../../testSeed/upload");

// Mock the required dependencies
jest.mock("../../../../src/lib/upload", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(uploadTestUrl, uploadController.find);

describe("Upload Find Controller", () => {
  it("should find uploads with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of uploads

    uploadServices.findAll.mockResolvedValue(createUploadData);

    const response = await request(app)
      .get(uploadTestUrl)
      .query(uploadTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
