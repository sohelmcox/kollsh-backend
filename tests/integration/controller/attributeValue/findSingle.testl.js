const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeValueController = require("../../../../src/api/v1/attributeValue/controllers");
const attributeValueServices = require("../../../../src/lib/attributeValue");
const {
  attributeValueTestUrl,
  mockAttributeValue,
} = require("../../../testSeed/attributeValue");

// Mock your service methods
jest.mock("../../../../src/lib/attributeValue", () => ({
  findSingle: jest.fn(),
}));

// Set up Express app and route
app.get(`${attributeValueTestUrl}/:id`, attributeValueController.findSingle);

describe("AttributeValue FindSingle Controller", () => {
  it("should find a single attributeValue by ID", async () => {
    // Mock the findSingle method from your service to return a attributeValue

    attributeValueServices.findSingle.mockResolvedValue(mockAttributeValue);

    const response = await request(app).get(
      `${attributeValueTestUrl}/attributeValueId`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("attributeValueId");
    expect(response.body.data.name).toBe("Test AttributeValue");
    expect(response.body.data.color_code).toBe("string");
    expect(response.body.data.value).toBe("string");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    attributeValueServices.findSingle.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app).get(
      `${attributeValueTestUrl}/attributeValueId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
