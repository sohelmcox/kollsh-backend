const request = require("supertest");
const { app } = require("../../../setup/app");
const categoryController = require("../../../../src/api/v1/category/controllers");
const categoryServices = require("../../../../src/lib/category");
const {
  categoryTestUrl,
  mockUpdatedCategory,
  editCategoryData,
} = require("../../../testSeed/category");

// Mock service methods
jest.mock("../../../../src/lib/category", () => ({
  edit: jest.fn(),
}));

// Set up Express app and route
app.put(`${categoryTestUrl}/:id`, categoryController.edit);

describe("Category Edit Controller", () => {
  it("should update an existing category", async () => {
    // Mock the edit method from your service to return an updated category
    categoryServices.edit.mockResolvedValue(mockUpdatedCategory);

    const response = await request(app)
      .put(`${categoryTestUrl}/categoryId`)
      .send(editCategoryData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Category updated successfully");
    expect(response.body.data.id).toBe("categoryId");
    expect(response.body.data.name).toBe("Updated Category");
    expect(response.body.data.featured).toBe(true);
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    categoryServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${categoryTestUrl}/categoryId`)
      .send(editCategoryData);

    expect(response.statusCode).toBe(500);
  });
});
