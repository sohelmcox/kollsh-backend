const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeController = require("../../../../src/api/v1/attribute/controllers");
const attributeServices = require("../../../../src/lib/attribute");
const {
  attributeTestUrl,
  mockAttribute,
} = require("../../../testSeed/attribute");

// Mock service methods
jest.mock("../../../../src/lib/attribute", () => ({
  findSingle: jest.fn(),
}));

// Set up Express app and route
app.get(`${attributeTestUrl}/:id`, attributeController.findSingle);

describe("Attribute FindSingle Controller", () => {
  it("should find a single attribute by ID", async () => {
    // Mock the findSingle method from your service to return a attribute

    attributeServices.findSingle.mockResolvedValue(mockAttribute);

    const response = await request(app).get(`${attributeTestUrl}/attributeId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("attributeId");
    expect(response.body.data.name).toBe("Mock Attribute");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    attributeServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${attributeTestUrl}/attributeId`);

    expect(response.statusCode).toBe(500);
  });
});
