const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeValueController = require("../../../../src/api/v1/attributeValue/controllers");
const attributeValueServices = require("../../../../src/lib/attributeValue");
const {
  attributeValueTestUrl,
  createAttributeValueData,
  attributeValueTestQuery,
} = require("../../../testSeed/attributeValue");

// Mock the required dependencies
jest.mock("../../../../src/lib/attributeValue", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(attributeValueTestUrl, attributeValueController.find);

describe("AttributeValue Find Controller", () => {
  it("should find attributeValues with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of attributeValues

    attributeValueServices.findAll.mockResolvedValue(createAttributeValueData);

    const response = await request(app)
      .get(attributeValueTestUrl)
      .query(attributeValueTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
