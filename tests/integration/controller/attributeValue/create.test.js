const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeValueController = require("../../../../src/api/v1/attributeValue/controllers");
const attributeValueServices = require("../../../../src/lib/attributeValue");
const {
  attributeValueTestUrl,
  attributeValueTestData,
} = require("../../../testSeed/attributeValue");
// Mock your service methods
jest.mock("../../../../src/lib/attributeValue", () => ({
  create: jest.fn(),
}));

// Set up Express app and route
app.post(attributeValueTestUrl, attributeValueController.create);

describe("AttributeValue Controller", () => {
  it("should create a new attributeValue", async () => {
    // Mock the create method from your service to return a sample attributeValue

    attributeValueServices.create.mockResolvedValue(attributeValueTestData);

    const response = await request(app)
      .post(attributeValueTestUrl)
      .send(attributeValueTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("AttributeValue Created Successfully");
    expect(response.body.data).toEqual(attributeValueTestData);
  });
});
