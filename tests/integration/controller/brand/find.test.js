const request = require("supertest");
const { app } = require("../../../setup/app");
const brandController = require("../../../../src/api/v1/brand/controllers");
const brandServices = require("../../../../src/lib/brand");
const {
  brandTestUrl,
  createBrandData,
  brandTestQuery,
} = require("../../../testSeed/brand");

// Mock the required dependencies
jest.mock("../../../../src/lib/brand", () => ({
  findAll: jest.fn(),
}));

// Set up Express app and route
app.get(brandTestUrl, brandController.find);

describe("Brand Find Controller", () => {
  it("should find brands with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of brands

    brandServices.findAll.mockResolvedValue(createBrandData);

    const response = await request(app).get(brandTestUrl).query(brandTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
