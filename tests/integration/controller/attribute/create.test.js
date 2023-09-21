const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeController = require("../../../../src/api/v1/attribute/controllers");
const attributeServices = require("../../../../src/lib/attribute");
const {
  attributeTestUrl,
  attributeTestData,
} = require("../../../testSeed/attribute");
// Mock your service methods
jest.mock("../../../../src/lib/attribute", () => ({
  create: jest.fn(),
}));

// Set up Express app and route
app.post(attributeTestUrl, attributeController.create);

describe("Attribute Controller", () => {
  it("should create a new attribute", async () => {
    // Mock the create method from your service to return a sample attribute
    attributeServices.create.mockResolvedValue(attributeTestData);

    const response = await request(app)
      .post(attributeTestUrl)
      .send(attributeTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Attribute Created Successfully");
    expect(response.body.data).toEqual(attributeTestData);
  });
});
