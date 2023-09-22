const request = require("supertest");
const { app } = require("../../../setup/app");
const cityController = require("../../../../src/api/v1/city/controllers");
const cityServices = require("../../../../src/lib/city");
const { cityTestUrl, cityTestData } = require("../../../testSeed/city");
// Mock service methods
jest.mock("../../../../src/lib/city", () => ({
  create: jest.fn(),
}));

// Set up route
app.post(cityTestUrl, cityController.create);

describe("City Controller", () => {
  it("should create a new city", async () => {
    // Mock the create method from your service to return a sample city

    cityServices.create.mockResolvedValue(cityTestData);

    const response = await request(app).post(cityTestUrl).send(cityTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("City Created Successfully");
    expect(response.body.data).toEqual(cityTestData);
  });
});
