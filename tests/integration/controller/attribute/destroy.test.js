const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeController = require("../../../../src/api/v1/attribute/controllers");
const attributeServices = require("../../../../src/lib/attribute");
const { attributeTestUrl } = require("../../../testSeed/attribute");

// Mock service methods
jest.mock("../../../../src/lib/attribute", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${attributeTestUrl}/:id`, attributeController.destroy);

describe("Attribute Destroy Controller", () => {
  it("should delete an existing attribute", async () => {
    // Mock the destroy method from your service to indicate success
    attributeServices.destroy.mockResolvedValue();

    const response = await request(app).delete(
      `${attributeTestUrl}/:attributeId`,
    );

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    attributeServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(
      `${attributeTestUrl}/:attributeId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
