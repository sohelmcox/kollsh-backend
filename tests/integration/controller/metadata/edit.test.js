const request = require("supertest");
const { app } = require("../../../setup/app");
const metadataController = require("../../../../src/api/v1/metadata/controllers");
const metadataServices = require("../../../../src/lib/metadata");
const {
  metadataTestUrl,
  mockUpdatedMetadata,
  editMetadataData,
} = require("../../../testSeed/metadata");

// Mock service methods
jest.mock("../../../../src/lib/metadata", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${metadataTestUrl}/:id`, metadataController.edit);

describe("Metadata Edit Controller", () => {
  it("should update an existing metadata", async () => {
    // Mock the edit method from your service to return an updated metadata
    metadataServices.edit.mockResolvedValue(mockUpdatedMetadata);

    const response = await request(app)
      .put(`${metadataTestUrl}/metadataId`)
      .send(editMetadataData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Metadata updated successfully");
    expect(response.body.data.id).toBe("metadataId");
    expect(response.body.data.title).toBe("Updated Metadata");
    expect(response.body.data.description).toBe("Updated Description");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    metadataServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${metadataTestUrl}/metadataId`)
      .send(editMetadataData);

    expect(response.statusCode).toBe(500);
  });
});
