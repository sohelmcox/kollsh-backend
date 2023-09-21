const request = require("supertest");
const { app } = require("../../../setup/app");
const brandController = require("../../../../src/api/v1/brand/controllers");
const brandServices = require("../../../../src/lib/brand");
const { brandTestUrl } = require("../../../testSeed/brand");

// Mock your service methods
jest.mock("../../../../src/lib/brand", () => ({
  destroyMany: jest.fn(),
}));

// Set up Express app and route
app.delete(brandTestUrl, brandController.destroyMany);

describe("Brand DestroyMany Controller", () => {
  it("should delete multiple brands with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted brands
    brandServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(brandTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 brands deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    brandServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(brandTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    brandServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(brandTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
