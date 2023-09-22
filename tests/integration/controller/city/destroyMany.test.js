const request = require("supertest");
const { app } = require("../../../setup/app");
const cityController = require("../../../../src/api/v1/city/controllers");
const cityServices = require("../../../../src/lib/city");
const { cityTestUrl } = require("../../../testSeed/city");

// Mock service methods
jest.mock("../../../../src/lib/city", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(cityTestUrl, cityController.destroyMany);

describe("City DestroyMany Controller", () => {
  it("should delete multiple cities with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted cities
    cityServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(cityTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 cities deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    cityServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(cityTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    cityServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(cityTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
