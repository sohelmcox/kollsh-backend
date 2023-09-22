const request = require("supertest");
const { app } = require("../../../setup/app");
const countryController = require("../../../../src/api/v1/country/controllers");
const countryServices = require("../../../../src/lib/country");
const { countryTestUrl, mockCountry } = require("../../../testSeed/country");

// Mock service methods
jest.mock("../../../../src/lib/country", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${countryTestUrl}/:id`, countryController.findSingle);

describe("Country FindSingle Controller", () => {
  it("should find a single country by ID", async () => {
    // Mock the findSingle method from your service to return a country

    countryServices.findSingle.mockResolvedValue(mockCountry);

    const response = await request(app).get(`${countryTestUrl}/countryId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("countryId");
    expect(response.body.data.name).toBe("Test Country");
    expect(response.body.data.code).toBe("string");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    countryServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${countryTestUrl}/countryId`);

    expect(response.statusCode).toBe(500);
  });
});
