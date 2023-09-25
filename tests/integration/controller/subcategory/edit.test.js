const request = require("supertest");
const { app } = require("../../../setup/app");
const subcategoryController = require("../../../../src/api/v1/subcategory/controllers");
const subcategoryServices = require("../../../../src/lib/subcategory");
const {
  subcategoryTestUrl,
  mockUpdatedSubcategory,
  editSubcategoryData,
} = require("../../../testSeed/subcategory");

// Mock service methods
jest.mock("../../../../src/lib/subcategory", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${subcategoryTestUrl}/:id`, subcategoryController.edit);

describe("Subcategory Edit Controller", () => {
  it("should update an existing subcategory", async () => {
    // Mock the edit method from your service to return an updated subcategory
    subcategoryServices.edit.mockResolvedValue(mockUpdatedSubcategory);

    const response = await request(app)
      .put(`${subcategoryTestUrl}/subcategoryId`)
      .send(editSubcategoryData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Subcategory updated successfully");
    expect(response.body.data.id).toBe("subcategoryId");
    expect(response.body.data.name).toBe("Updated Subcategory");
    expect(response.body.data.priority).toBe(1);
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    subcategoryServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${subcategoryTestUrl}/subcategoryId`)
      .send(editSubcategoryData);

    expect(response.statusCode).toBe(500);
  });
});
