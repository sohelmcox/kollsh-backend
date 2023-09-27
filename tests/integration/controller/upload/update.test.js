const request = require("supertest");
const { app } = require("../../../setup/app");
const brandController = require("../../../../src/api/v1/brand/controllers");
const brandServices = require("../../../../src/lib/brand");
const {
  brandTestUrl,
  updatedBrandData,
  newBrandData,
  mockUpdatedBrand,
} = require("../../../testSeed/brand");

// Mock service methods
jest.mock("../../../../src/lib/brand", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up route
app.put(`${brandTestUrl}/:id`, brandController.updateOrCreate);

describe("Brand Update Controller", () => {
  it("should update an existing brand", async () => {
    // Mock the updateOrCreate method from your service to return an updated brand

    brandServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedBrand,
      code: 200,
    });

    const response = await request(app)
      .put(`${brandTestUrl}/brandId`)
      .send(updatedBrandData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Brand updated successfully");
    expect(response.body.data.id).toBe("brandId");
    expect(response.body.data.name).toBe("Updated Brand");
    expect(response.body.data.description).toBe("Updated Description");
  });

  it("should create a new brand if not found", async () => {
    // Mock the updateOrCreate method to create a new brand

    brandServices.updateOrCreate.mockResolvedValue({
      data: newBrandData,
      code: 201,
    });

    const response = await request(app)
      .put(`${brandTestUrl}/nonExistentId`)
      .send(updatedBrandData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Brand created successfully");
    expect(response.body.data.id).toBe("newBrandId");
    expect(response.body.data.name).toBe("New Brand");
    expect(response.body.data.description).toBe("New Description");
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    brandServices.updateOrCreate.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${brandTestUrl}/brandId`)
      .send(updatedBrandData);

    expect(response.statusCode).toBe(500);
  });
});
