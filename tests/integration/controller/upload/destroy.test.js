const request = require("supertest");
const { app } = require("../../../setup/app");
const uploadController = require("../../../../src/api/v1/upload/controllers");
const uploadServices = require("../../../../src/lib/upload");
const { uploadTestUrl } = require("../../../testSeed/upload");

// Mock service methods
jest.mock("../../../../src/lib/upload", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${uploadTestUrl}/:id`, uploadController.destroy);

describe("Upload Destroy Controller", () => {
  it("should delete an existing upload", async () => {
    // Mock the destroy method from your service to indicate success
    uploadServices.destroy.mockResolvedValue();

    const response = await request(app).delete(`${uploadTestUrl}/:uploadId`);

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    uploadServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(`${uploadTestUrl}/:uploadId`);

    expect(response.statusCode).toBe(500);
  });
});
