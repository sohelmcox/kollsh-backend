const request = require("supertest");
const { app } = require("../../../setup/app");
const brandController = require("../../../../src/api/v1/brand/controllers");
const brandServices = require("../../../../src/lib/brand");
const { brandTestUrl, mockBrand } = require("../../../testSeed/brand");

// Mock your service methods
jest.mock("../../../../src/lib/brand", () => ({
  findSingle: jest.fn(),
}));

// Set up Express app and route
app.get(`${brandTestUrl}/:id`, brandController.findSingle);

describe("Brand FindSingle Controller", () => {
  it("should find a single brand by ID", async () => {
    // Mock the findSingle method from your service to return a brand

    brandServices.findSingle.mockResolvedValue(mockBrand);

    const response = await request(app).get(`${brandTestUrl}/brandId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("brandId");
    expect(response.body.data.name).toBe("Test Brand");
    expect(response.body.data.description).toBe("Test Description");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    brandServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${brandTestUrl}/brandId`);

    expect(response.statusCode).toBe(500);
  });
});
