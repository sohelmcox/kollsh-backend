const request = require("supertest");
const { app } = require("../../../setup/app");
const subcategoryController = require("../../../../src/api/v1/subcategory/controllers");
const subcategoryServices = require("../../../../src/lib/subcategory");
const {
  subcategoryTestUrl,
  updatedSubcategoryData,
  newSubcategoryData,
  mockUpdatedSubcategory,
} = require("../../../testSeed/subcategory");

// Mock service methods
jest.mock("../../../../src/lib/subcategory", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up route
app.put(`${subcategoryTestUrl}/:id`, subcategoryController.updateOrCreate);

describe("Subcategory Update Controller", () => {
  it("should update an existing subcategory", async () => {
    // Mock the updateOrCreate method from your service to return an updated subcategory

    subcategoryServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedSubcategory,
      code: 200,
    });

    const response = await request(app)
      .put(`${subcategoryTestUrl}/subcategoryId`)
      .send(updatedSubcategoryData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Subcategory updated successfully");
    expect(response.body.data.id).toBe("subcategoryId");
    expect(response.body.data.name).toBe("Updated Subcategory");
    expect(response.body.data.priority).toBe(1);
  });

  it("should create a new subcategory if not found", async () => {
    // Mock the updateOrCreate method to create a new subcategory

    subcategoryServices.updateOrCreate.mockResolvedValue({
      data: newSubcategoryData,
      code: 201,
    });

    const response = await request(app)
      .put(`${subcategoryTestUrl}/nonExistentId`)
      .send(updatedSubcategoryData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Subcategory created successfully");
    expect(response.body.data.id).toBe("newSubcategoryId");
    expect(response.body.data.name).toBe("New Subcategory");
    expect(response.body.data.priority).toBe(0);
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    subcategoryServices.updateOrCreate.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .put(`${subcategoryTestUrl}/subcategoryId`)
      .send(updatedSubcategoryData);

    expect(response.statusCode).toBe(500);
  });
});
