const request = require("supertest");
const { app } = require("../../../setup/app");
const metadataController = require("../../../../src/api/v1/metadata/controllers");
const metadataServices = require("../../../../src/lib/metadata");
const { metadataTestUrl, mockMetadata } = require("../../../testSeed/metadata");

// Mock service methods
jest.mock("../../../../src/lib/metadata", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${metadataTestUrl}/:id`, metadataController.findSingle);

describe("Metadata FindSingle Controller", () => {
  it("should find a single metadata by ID", async () => {
    // Mock the findSingle method from your service to return a metadata

    metadataServices.findSingle.mockResolvedValue(mockMetadata);

    const response = await request(app).get(`${metadataTestUrl}/metadataId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("metadataId");
    expect(response.body.data.title).toBe("Test Metadata");
    expect(response.body.data.description).toBe("Test Description");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    metadataServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${metadataTestUrl}/metadataId`);

    expect(response.statusCode).toBe(500);
  });
});
