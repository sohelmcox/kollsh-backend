const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeController = require("../../../../src/api/v1/attribute/controllers");
const attributeServices = require("../../../../src/lib/attribute");
const { attributeTestUrl } = require("../../../testSeed/attribute");

// Mock service methods
jest.mock("../../../../src/lib/attribute", () => ({
  destroyMany: jest.fn(),
}));

// Set up Express app and route
app.delete(attributeTestUrl, attributeController.destroyMany);

describe("Attribute DestroyMany Controller", () => {
  it("should delete multiple attributes with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted attributes
    attributeServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(attributeTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 attributes deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    attributeServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(attributeTestUrl)
      .send({ ids: "invalidId" }); //  invalid IDs

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    attributeServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(attributeTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
