const request = require("supertest");
const { app } = require("../../../setup/app");
const metadataController = require("../../../../src/api/v1/metadata/controllers");
const metadataServices = require("../../../../src/lib/metadata");
const { metadataTestUrl } = require("../../../testSeed/metadata");

// Mock service methods
jest.mock("../../../../src/lib/metadata", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${metadataTestUrl}/:id`, metadataController.destroy);

describe("Metadata Destroy Controller", () => {
  it("should delete an existing metadata", async () => {
    // Mock the destroy method from your service to indicate success
    metadataServices.destroy.mockResolvedValue();

    const response = await request(app).delete(
      `${metadataTestUrl}/:metadataId`,
    );

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    metadataServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(
      `${metadataTestUrl}/:metadataId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
