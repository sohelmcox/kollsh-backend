const request = require("supertest");
const { app } = require("./utils");
const brandController = require("../../../../src/api/v1/brand/controllers");
const brandServices = require("../../../../src/lib/brand"); // Replace with the correct path to your service file
const { brandTestUrl } = require("../../../testSeed/brand");
// Mock your service methods
jest.mock("../../../../src/lib/brand", () => ({
  create: jest.fn(),
}));

// Set up Express app and route
app.post(brandTestUrl, brandController.create);

describe("Brand Controller", () => {
  it("should create a new brand", async () => {
    // Mock the create method from your service to return a sample brand
    const sampleBrand = {
      name: "Sample Brand",
      image: "sample.jpg",
      description: "Sample brand description",
      priority: 1,
    };
    brandServices.create.mockResolvedValue(sampleBrand);

    const response = await request(app).post(brandTestUrl).send(sampleBrand);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Brand Created Successfully");
    expect(response.body.data).toEqual(sampleBrand);
  });
});
