const request = require("supertest");
const { app } = require("../../../setup/app");
const countryController = require("../../../../src/api/v1/country/controllers");
const countryServices = require("../../../../src/lib/country");
const {
  countryTestUrl,
  createCountryData,
  countryTestQuery,
} = require("../../../testSeed/country");

// Mock the required dependencies
jest.mock("../../../../src/lib/country", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(countryTestUrl, countryController.find);

describe("Country Find Controller", () => {
  it("should find countries with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of countries

    countryServices.findAll.mockResolvedValue(createCountryData);

    const response = await request(app)
      .get(countryTestUrl)
      .query(countryTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
