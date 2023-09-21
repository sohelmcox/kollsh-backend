const request = require("supertest");
const { app } = require("../../../setup/app");
const categoryController = require("../../../../src/api/v1/category/controllers");
const categoryServices = require("../../../../src/lib/category");
const {
  categoryTestUrl,
  updatedCategoryData,
  newCategoryData,
  mockUpdatedCategory,
} = require("../../../testSeed/category");

// Mock your service methods
jest.mock("../../../../src/lib/category", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up Express app and route
app.put(`${categoryTestUrl}/:id`, categoryController.updateOrCreate);

describe("Category Update Controller", () => {
  it("should update an existing category", async () => {
    // Mock the updateOrCreate method from your service to return an updated category

    categoryServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedCategory,
      code: 200,
    });

    const response = await request(app)
      .put(`${categoryTestUrl}/categoryId`)
      .send(updatedCategoryData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Category updated successfully");
    expect(response.body.data.id).toBe("categoryId");
    expect(response.body.data.name).toBe("Updated Category");
    expect(response.body.data.featured).toBe(true);
  });

  it("should create a new category if not found", async () => {
    // Mock the updateOrCreate method to create a new category

    categoryServices.updateOrCreate.mockResolvedValue({
      data: newCategoryData,
      code: 201,
    });

    const response = await request(app)
      .put(`${categoryTestUrl}/nonExistentId`)
      .send(updatedCategoryData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Category created successfully");
    expect(response.body.data.id).toBe("newCategoryId");
    expect(response.body.data.name).toBe("New Category");
    expect(response.body.data.featured).toBe(true);
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    categoryServices.updateOrCreate.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .put(`${categoryTestUrl}/categoryId`)
      .send(updatedCategoryData);

    expect(response.statusCode).toBe(500);
  });
});
