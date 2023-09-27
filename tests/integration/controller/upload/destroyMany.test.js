const request = require("supertest");
const { app } = require("../../../setup/app");
const uploadController = require("../../../../src/api/v1/upload/controllers");
const uploadServices = require("../../../../src/lib/upload");
const { uploadTestUrl } = require("../../../testSeed/upload");

// Mock service methods
jest.mock("../../../../src/lib/upload", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(uploadTestUrl, uploadController.destroyMany);

describe("Upload DestroyMany Controller", () => {
  it("should delete multiple uploads with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted uploads
    uploadServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(uploadTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 files deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    uploadServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(uploadTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    uploadServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(uploadTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
