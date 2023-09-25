const request = require("supertest");
const { app } = require("../../../setup/app");
const subcategoryController = require("../../../../src/api/v1/subcategory/controllers");
const subcategoryServices = require("../../../../src/lib/subcategory");
const {
  subcategoryTestUrl,
  mockSubcategory,
} = require("../../../testSeed/subcategory");

// Mock service methods
jest.mock("../../../../src/lib/subcategory", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${subcategoryTestUrl}/:id`, subcategoryController.findSingle);

describe("Subcategory FindSingle Controller", () => {
  it("should find a single subcategory by ID", async () => {
    // Mock the findSingle method from your service to return a subcategory

    subcategoryServices.findSingle.mockResolvedValue(mockSubcategory);

    const response = await request(app).get(
      `${subcategoryTestUrl}/subcategoryId`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("subcategoryId");
    expect(response.body.data.name).toBe("Test Subcategory");
    expect(response.body.data.priority).toBe(0);
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    subcategoryServices.findSingle.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app).get(
      `${subcategoryTestUrl}/subcategoryId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
