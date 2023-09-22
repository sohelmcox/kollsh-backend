const request = require("supertest");
const { app } = require("../../../setup/app");
const itemDetailsController = require("../../../../src/api/v1/itemDetails/controllers");
const itemDetailsServices = require("../../../../src/lib/itemDetails");
const {
  itemDetailsTestUrl,
  updatedItemDetailsData,
  newItemDetailsData,
  mockUpdatedItemDetails,
} = require("../../../testSeed/itemDetails");

// Mock service methods
jest.mock("../../../../src/lib/itemDetails", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up route
app.put(`${itemDetailsTestUrl}/:id`, itemDetailsController.updateOrCreate);

describe("ItemDetails Update Controller", () => {
  it("should update an existing itemDetails", async () => {
    // Mock the updateOrCreate method from your service to return an updated itemDetails

    itemDetailsServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedItemDetails,
      code: 200,
    });

    const response = await request(app)
      .put(`${itemDetailsTestUrl}/itemDetailsId`)
      .send(updatedItemDetailsData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("ItemDetails updated successfully");
    expect(response.body.data.id).toBe("itemDetailsId");
    expect(response.body.data.email).toBe("user@example.com");
    expect(response.body.data.description).toBe("Updated Description");
  });

  it("should create a new itemDetails if not found", async () => {
    // Mock the updateOrCreate method to create a new itemDetails

    itemDetailsServices.updateOrCreate.mockResolvedValue({
      data: newItemDetailsData,
      code: 201,
    });

    const response = await request(app)
      .put(`${itemDetailsTestUrl}/nonExistentId`)
      .send(updatedItemDetailsData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("ItemDetails created successfully");
    expect(response.body.data.id).toBe("newItemDetailsId");
    expect(response.body.data.email).toBe("user@example.com");
    expect(response.body.data.description).toBe("New ItemDetails");
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    itemDetailsServices.updateOrCreate.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .put(`${itemDetailsTestUrl}/itemDetailsId`)
      .send(updatedItemDetailsData);

    expect(response.statusCode).toBe(500);
  });
});
