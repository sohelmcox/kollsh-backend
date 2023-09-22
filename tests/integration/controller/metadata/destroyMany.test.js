const request = require("supertest");
const { app } = require("../../../setup/app");
const metadataController = require("../../../../src/api/v1/metadata/controllers");
const metadataServices = require("../../../../src/lib/metadata");
const { metadataTestUrl } = require("../../../testSeed/metadata");

// Mock service methods
jest.mock("../../../../src/lib/metadata", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(metadataTestUrl, metadataController.destroyMany);

describe("Metadata DestroyMany Controller", () => {
  it("should delete multiple metadata with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted metadata
    metadataServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(metadataTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 metadata's deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    metadataServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(metadataTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    metadataServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(metadataTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
