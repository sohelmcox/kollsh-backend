const request = require("supertest");
const { app } = require("../../../setup/app");
const categoryController = require("../../../../src/api/v1/category/controllers");
const categoryServices = require("../../../../src/lib/category");
const { categoryTestUrl } = require("../../../testSeed/category");

// Mock service methods
jest.mock("../../../../src/lib/category", () => ({
  destroyMany: jest.fn(),
}));

// Set up Express app and route
app.delete(categoryTestUrl, categoryController.destroyMany);

describe("Category DestroyMany Controller", () => {
  it("should delete multiple categories with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted categories
    categoryServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(categoryTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 categories deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    categoryServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(categoryTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    categoryServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(categoryTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
