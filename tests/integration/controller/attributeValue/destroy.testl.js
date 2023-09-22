const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeValueController = require("../../../../src/api/v1/attributeValue/controllers");
const attributeValueServices = require("../../../../src/lib/attributeValue");
const { attributeValueTestUrl } = require("../../../testSeed/attributeValue");

// Mock service methods
jest.mock("../../../../src/lib/attributeValue", () => ({
  destroy: jest.fn(),
}));

// Set up Express app and route
app.delete(`${attributeValueTestUrl}/:id`, attributeValueController.destroy);

describe("AttributeValue Destroy Controller", () => {
  it("should delete an existing attributeValue", async () => {
    // Mock the destroy method from your service to indicate success
    attributeValueServices.destroy.mockResolvedValue();

    const response = await request(app).delete(
      `${attributeValueTestUrl}/:attributeValueId`,
    );

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    attributeValueServices.destroy.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app).delete(
      `${attributeValueTestUrl}/:attributeValueId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
