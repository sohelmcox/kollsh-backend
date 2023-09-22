const request = require("supertest");
const { app } = require("../../../setup/app");
const categoryController = require("../../../../src/api/v1/category/controllers");
const categoryServices = require("../../../../src/lib/category");
const {
  categoryTestUrl,
  createCategoryData,
  categoryTestQuery,
} = require("../../../testSeed/category");

// Mock the required dependencies
jest.mock("../../../../src/lib/category", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(categoryTestUrl, categoryController.find);

describe("Category Find Controller", () => {
  it("should find categories with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of categories

    categoryServices.findAll.mockResolvedValue(createCategoryData);

    const response = await request(app)
      .get(categoryTestUrl)
      .query(categoryTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
