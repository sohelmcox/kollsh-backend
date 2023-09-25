const request = require("supertest");
const { app } = require("../../../setup/app");
const subcategoryController = require("../../../../src/api/v1/subcategory/controllers");
const subcategoryServices = require("../../../../src/lib/subcategory");
const { subcategoryTestUrl } = require("../../../testSeed/subcategory");

// Mock service methods
jest.mock("../../../../src/lib/subcategory", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${subcategoryTestUrl}/:id`, subcategoryController.destroy);

describe("Subcategory Destroy Controller", () => {
  it("should delete an existing subcategory", async () => {
    // Mock the destroy method from your service to indicate success
    subcategoryServices.destroy.mockResolvedValue();

    const response = await request(app).delete(
      `${subcategoryTestUrl}/:subcategoryId`,
    );

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    subcategoryServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(
      `${subcategoryTestUrl}/:subcategoryId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
