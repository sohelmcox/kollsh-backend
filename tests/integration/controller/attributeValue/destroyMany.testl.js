const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeValueController = require("../../../../src/api/v1/attributeValue/controllers");
const attributeValueServices = require("../../../../src/lib/attributeValue");
const { attributeValueTestUrl } = require("../../../testSeed/attributeValue");

// Mock service methods
jest.mock("../../../../src/lib/attributeValue", () => ({
  destroyMany: jest.fn(),
}));

// Set up Express app and route
app.delete(attributeValueTestUrl, attributeValueController.destroyMany);

describe("AttributeValue DestroyMany Controller", () => {
  it("should delete multiple attributeValues with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted attributeValues
    attributeValueServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(attributeValueTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 attributeValues deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    attributeValueServices.destroyMany.mockRejectedValue(
      new Error("Invalid IDs"),
    );

    const response = await request(app)
      .delete(attributeValueTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    attributeValueServices.destroyMany.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .delete(attributeValueTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
