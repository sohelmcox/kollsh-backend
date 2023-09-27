const request = require("supertest");
const { app } = require("../../../setup/app");
const uploadController = require("../../../../src/api/v1/upload/controllers");
const uploadServices = require("../../../../src/lib/upload");
const { uploadTestUrl, mockUpload } = require("../../../testSeed/upload");

// Mock service methods
jest.mock("../../../../src/lib/upload", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${uploadTestUrl}/:id`, uploadController.findSingle);

describe("Upload FindSingle Controller", () => {
  it("should find a single upload by ID", async () => {
    // Mock the findSingle method from your service to return a upload

    uploadServices.findSingle.mockResolvedValue(mockUpload);

    const response = await request(app).get(
      `${uploadTestUrl}/6502a59b35d01ff95a2c2527`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("6502a59b35d01ff95a2c2527");
    expect(response.body.data.alternativeText).toBe(
      "whatsapp image 2023-09-18 at 1",
    );
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    uploadServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${uploadTestUrl}/uploadId`);

    expect(response.statusCode).toBe(500);
  });
});
