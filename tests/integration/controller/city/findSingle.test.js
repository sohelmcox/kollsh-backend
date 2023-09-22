const request = require("supertest");
const { app } = require("../../../setup/app");
const cityController = require("../../../../src/api/v1/city/controllers");
const cityServices = require("../../../../src/lib/city");
const { cityTestUrl, mockCity } = require("../../../testSeed/city");

// Mock service methods
jest.mock("../../../../src/lib/city", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${cityTestUrl}/:id`, cityController.findSingle);

describe("City FindSingle Controller", () => {
  it("should find a single city by ID", async () => {
    // Mock the findSingle method from your service to return a city

    cityServices.findSingle.mockResolvedValue(mockCity);

    const response = await request(app).get(`${cityTestUrl}/cityId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("cityId");
    expect(response.body.data.name).toBe("Test City");
    expect(response.body.data.priority).toBe(0);
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    cityServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${cityTestUrl}/cityId`);

    expect(response.statusCode).toBe(500);
  });
});
