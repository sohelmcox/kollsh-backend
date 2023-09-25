const request = require("supertest");
const { app } = require("../../../setup/app");
const subcategoryController = require("../../../../src/api/v1/subcategory/controllers");
const subcategoryServices = require("../../../../src/lib/subcategory");
const {
  subcategoryTestUrl,
  createSubcategoryData,
  subcategoryTestQuery,
} = require("../../../testSeed/subcategory");

// Mock the required dependencies
jest.mock("../../../../src/lib/subcategory", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(subcategoryTestUrl, subcategoryController.find);

describe("Subcategory Find Controller", () => {
  it("should find subcategories with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of subcategories

    subcategoryServices.findAll.mockResolvedValue(createSubcategoryData);

    const response = await request(app)
      .get(subcategoryTestUrl)
      .query(subcategoryTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
