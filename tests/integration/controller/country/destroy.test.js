const request = require("supertest");
const { app } = require("../../../setup/app");
const countryController = require("../../../../src/api/v1/country/controllers");
const countryServices = require("../../../../src/lib/country");
const { countryTestUrl } = require("../../../testSeed/country");

// Mock service methods
jest.mock("../../../../src/lib/country", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${countryTestUrl}/:id`, countryController.destroy);

describe("Country Destroy Controller", () => {
  it("should delete an existing country", async () => {
    // Mock the destroy method from your service to indicate success
    countryServices.destroy.mockResolvedValue();

    const response = await request(app).delete(`${countryTestUrl}/:countryId`);

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    countryServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(`${countryTestUrl}/:countryId`);

    expect(response.statusCode).toBe(500);
  });
});
