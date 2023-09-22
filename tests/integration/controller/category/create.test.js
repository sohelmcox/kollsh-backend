const request = require("supertest");
const { app } = require("../../../setup/app");
const categoryController = require("../../../../src/api/v1/category/controllers");
const categoryServices = require("../../../../src/lib/category");
const {
  categoryTestUrl,
  categoryTestData,
} = require("../../../testSeed/category");
// Mock service methods
jest.mock("../../../../src/lib/category", () => ({
  create: jest.fn(),
}));

// Set up Express app and route
app.post(categoryTestUrl, categoryController.create);

describe("Category Controller", () => {
  it("should create a new category", async () => {
    // Mock the create method from your service to return a sample category

    categoryServices.create.mockResolvedValue(categoryTestData);

    const response = await request(app)
      .post(categoryTestUrl)
      .send(categoryTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Category Created Successfully");
    expect(response.body.data).toEqual(categoryTestData);
  });
});
