const request = require("supertest");
const { app } = require("../../../setup/app");
const cityController = require("../../../../src/api/v1/city/controllers");
const cityServices = require("../../../../src/lib/city");
const {
  cityTestUrl,
  createCityData,
  cityTestQuery,
} = require("../../../testSeed/city");

// Mock the required dependencies
jest.mock("../../../../src/lib/city", () => ({
  findAll: jest.fn(),
}));

// Set up Express app and route
app.get(cityTestUrl, cityController.find);

describe("City Find Controller", () => {
  it("should find cities with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of cities

    cityServices.findAll.mockResolvedValue(createCityData);

    const response = await request(app).get(cityTestUrl).query(cityTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
