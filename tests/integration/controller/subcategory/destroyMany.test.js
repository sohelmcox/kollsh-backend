const request = require("supertest");
const { app } = require("../../../setup/app");
const subcategoryController = require("../../../../src/api/v1/subcategory/controllers");
const subcategoryServices = require("../../../../src/lib/subcategory");
const { subcategoryTestUrl } = require("../../../testSeed/subcategory");

// Mock service methods
jest.mock("../../../../src/lib/subcategory", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(subcategoryTestUrl, subcategoryController.destroyMany);

describe("Subcategory DestroyMany Controller", () => {
  it("should delete multiple subcategories with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted subcategories
    subcategoryServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(subcategoryTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 subcategories deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    subcategoryServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(subcategoryTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    subcategoryServices.destroyMany.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .delete(subcategoryTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
