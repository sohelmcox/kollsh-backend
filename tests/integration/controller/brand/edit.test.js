const request = require("supertest");
const { app } = require("../../../setup/app");
const brandController = require("../../../../src/api/v1/brand/controllers");
const brandServices = require("../../../../src/lib/brand");
const {
  brandTestUrl,
  mockUpdatedBrand,
  editBrandData,
} = require("../../../testSeed/brand");

// Mock your service methods
jest.mock("../../../../src/lib/brand", () => ({
  edit: jest.fn(),
}));

// Set up Express app and route
app.put(`${brandTestUrl}/:id`, brandController.edit);

describe("Brand Edit Controller", () => {
  it("should update an existing brand", async () => {
    // Mock the edit method from your service to return an updated brand
    brandServices.edit.mockResolvedValue(mockUpdatedBrand);

    const response = await request(app)
      .put(`${brandTestUrl}/brandId`)
      .send(editBrandData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Brand updated successfully");
    expect(response.body.data.id).toBe("brandId");
    expect(response.body.data.name).toBe("Updated Brand");
    expect(response.body.data.description).toBe("Updated Description");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    brandServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${brandTestUrl}/brandId`)
      .send(editBrandData);

    expect(response.statusCode).toBe(500);
  });
});
