const request = require("supertest");
const { app } = require("../../../setup/app");
const categoryController = require("../../../../src/api/v1/category/controllers");
const categoryServices = require("../../../../src/lib/category");
const { categoryTestUrl, mockCategory } = require("../../../testSeed/category");

// Mock your service methods
jest.mock("../../../../src/lib/category", () => ({
  findSingle: jest.fn(),
}));

// Set up Express app and route
app.get(`${categoryTestUrl}/:id`, categoryController.findSingle);

describe("Category FindSingle Controller", () => {
  it("should find a single category by ID", async () => {
    // Mock the findSingle method from your service to return a category

    categoryServices.findSingle.mockResolvedValue(mockCategory);

    const response = await request(app).get(`${categoryTestUrl}/categoryId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("categoryId");
    expect(response.body.data.name).toBe("Test Category");
    expect(response.body.data.featured).toBe(true);
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    categoryServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${categoryTestUrl}/categoryId`);

    expect(response.statusCode).toBe(500);
  });
});
