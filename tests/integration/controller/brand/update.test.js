const request = require("supertest");
const { app } = require("./utils");
const brandController = require("../../../../src/api/v1/brand/controllers");
const brandServices = require("../../../../src/lib/brand");
const { brandTestUrl } = require("../../../testSeed/brand");

// Mock your service methods
jest.mock("../../../../src/lib/brand", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up Express app and route
app.put(`${brandTestUrl}/:id`, brandController.updateOrCreate);

describe("Brand Update Controller", () => {
  it("should update an existing brand", async () => {
    // Mock the updateOrCreate method from your service to return an updated brand
    const mockUpdatedBrand = {
      id: "brandId",
      name: "Updated Brand",
      description: "Updated Description",
    };
    brandServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedBrand,
      code: 200,
    });

    const response = await request(app).put(`${brandTestUrl}/brandId`).send({
      name: "Updated Brand",
      description: "Updated Description",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Brand updated successfully");
    expect(response.body.data.id).toBe("brandId");
    expect(response.body.data.name).toBe("Updated Brand");
    expect(response.body.data.description).toBe("Updated Description");
  });

  it("should create a new brand if not found", async () => {
    // Mock the updateOrCreate method to create a new brand
    const mockNewBrand = {
      id: "newBrandId",
      name: "New Brand",
      description: "New Description",
    };
    brandServices.updateOrCreate.mockResolvedValue({
      data: mockNewBrand,
      code: 201,
    });

    const response = await request(app)
      .put(`${brandTestUrl}/nonExistentId`)
      .send({
        name: "New Brand",
        description: "New Description",
      });

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

    const response = await request(app).put(`${brandTestUrl}/brandId`).send({
      name: "Updated Brand",
      description: "Updated Description",
    });

    expect(response.statusCode).toBe(500);
  });
});
