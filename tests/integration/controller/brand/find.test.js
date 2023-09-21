const request = require("supertest");
const { app } = require("./utils");
const brandController = require("../../../../src/api/v1/brand/controllers");
const brandServices = require("../../../../src/lib/brand");
const { brandTestUrl } = require("../../../testSeed/brand");

// Mock the required dependencies
jest.mock("../../../../src/lib/brand", () => ({
  findAll: jest.fn(),
}));

// Set up Express app and route
app.get(brandTestUrl, brandController.find);

describe("Brand Find Controller", () => {
  it("should find brands with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of brands
    const sampleBrands = [
      { name: "Brand A", description: "Description A" },
      { name: "Brand B", description: "Description B" },
    ];
    brandServices.findAll.mockResolvedValue(sampleBrands);

    const response = await request(app).get(brandTestUrl).query({
      sort: "name",
      fields: "name,description",
      pageSize: 10,
      pageNumber: 1,
    });

    expect(response.statusCode).toBe(200);
  });
});
