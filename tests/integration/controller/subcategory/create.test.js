const request = require("supertest");
const { app } = require("../../../setup/app");
const subcategoryController = require("../../../../src/api/v1/subcategory/controllers");
const subcategoryServices = require("../../../../src/lib/subcategory");
const {
  subcategoryTestUrl,
  subcategoryTestData,
} = require("../../../testSeed/subcategory");
// Mock service methods
jest.mock("../../../../src/lib/subcategory", () => ({
  create: jest.fn(),
}));

// Set up route
app.post(subcategoryTestUrl, subcategoryController.create);

describe("Subcategory Controller", () => {
  it("should create a new subcategory", async () => {
    // Mock the create method from your service to return a sample subcategory

    subcategoryServices.create.mockResolvedValue(subcategoryTestData);

    const response = await request(app)
      .post(subcategoryTestUrl)
      .send(subcategoryTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Subcategory Created Successfully");
    expect(response.body.data).toEqual(subcategoryTestData);
  });
});
