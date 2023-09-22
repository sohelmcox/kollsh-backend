const request = require("supertest");
const { app } = require("../../../setup/app");
const metadataController = require("../../../../src/api/v1/metadata/controllers");
const metadataServices = require("../../../../src/lib/metadata");
const {
  metadataTestUrl,
  createMetadataData,
  metadataTestQuery,
} = require("../../../testSeed/metadata");

// Mock the required dependencies
jest.mock("../../../../src/lib/metadata", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(metadataTestUrl, metadataController.find);

describe("Metadata Find Controller", () => {
  it("should find metadata with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of metadata

    metadataServices.findAll.mockResolvedValue(createMetadataData);

    const response = await request(app)
      .get(metadataTestUrl)
      .query(metadataTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
