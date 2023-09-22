const request = require("supertest");
const { app } = require("../../../setup/app");
const metadataController = require("../../../../src/api/v1/metadata/controllers");
const metadataServices = require("../../../../src/lib/metadata");
const {
  metadataTestUrl,
  metadataTestData,
} = require("../../../testSeed/metadata");
// Mock service methods
jest.mock("../../../../src/lib/metadata", () => ({
  create: jest.fn(),
}));

// Set up route
app.post(metadataTestUrl, metadataController.create);

describe("Metadata Controller", () => {
  it("should create a new metadata", async () => {
    // Mock the create method from your service to return a sample metadata

    metadataServices.create.mockResolvedValue(metadataTestData);

    const response = await request(app)
      .post(metadataTestUrl)
      .send(metadataTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Metadata Created Successfully");
    expect(response.body.data).toEqual(metadataTestData);
  });
});
