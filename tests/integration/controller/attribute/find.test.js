const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeController = require("../../../../src/api/v1/attribute/controllers");
const attributeServices = require("../../../../src/lib/attribute");
const {
  attributeTestUrl,
  createAttributeData,
  attributeTestQuery,
} = require("../../../testSeed/attribute");

// Mock the required dependencies
jest.mock("../../../../src/lib/attribute", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(attributeTestUrl, attributeController.find);

describe("Attribute Find Controller", () => {
  it("should find attributes with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of attributes
    attributeServices.findAll.mockResolvedValue(createAttributeData);

    const response = await request(app)
      .get(attributeTestUrl)
      .query(attributeTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
