const request = require("supertest");
const { app } = require("../../../setup/app");
const countryController = require("../../../../src/api/v1/country/controllers");
const countryServices = require("../../../../src/lib/country");
const { countryTestUrl } = require("../../../testSeed/country");

// Mock service methods
jest.mock("../../../../src/lib/country", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(countryTestUrl, countryController.destroyMany);

describe("Country DestroyMany Controller", () => {
  it("should delete multiple countries with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted countries
    countryServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(countryTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 countries deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    countryServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(countryTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    countryServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(countryTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
