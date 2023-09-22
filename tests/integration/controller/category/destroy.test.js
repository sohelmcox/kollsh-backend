const request = require("supertest");
const { app } = require("../../../setup/app");
const categoryController = require("../../../../src/api/v1/category/controllers");
const categoryServices = require("../../../../src/lib/category");
const { categoryTestUrl } = require("../../../testSeed/category");

// Mock service methods
jest.mock("../../../../src/lib/category", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${categoryTestUrl}/:id`, categoryController.destroy);

describe("Category Destroy Controller", () => {
  it("should delete an existing category", async () => {
    // Mock the destroy method from your service to indicate success
    categoryServices.destroy.mockResolvedValue();

    const response = await request(app).delete(
      `${categoryTestUrl}/:categoryId`,
    );

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    categoryServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(
      `${categoryTestUrl}/:categoryId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
