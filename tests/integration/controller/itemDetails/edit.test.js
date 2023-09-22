const request = require("supertest");
const { app } = require("../../../setup/app");
const itemDetailsController = require("../../../../src/api/v1/itemDetails/controllers");
const itemDetailsServices = require("../../../../src/lib/itemDetails");
const {
  itemDetailsTestUrl,
  mockUpdatedItemDetails,
  editItemDetailsData,
} = require("../../../testSeed/itemDetails");

// Mock service methods
jest.mock("../../../../src/lib/itemDetails", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${itemDetailsTestUrl}/:id`, itemDetailsController.edit);

describe("ItemDetails Edit Controller", () => {
  it("should update an existing itemDetails", async () => {
    // Mock the edit method from your service to return an updated itemDetails
    itemDetailsServices.edit.mockResolvedValue(mockUpdatedItemDetails);

    const response = await request(app)
      .put(`${itemDetailsTestUrl}/itemDetailsId`)
      .send(editItemDetailsData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("ItemDetails updated successfully");
    expect(response.body.data.id).toBe("itemDetailsId");
    expect(response.body.data.description).toBe("Updated Description");
    expect(response.body.data.email).toBe("user@example.com");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    itemDetailsServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${itemDetailsTestUrl}/itemDetailsId`)
      .send(editItemDetailsData);

    expect(response.statusCode).toBe(500);
  });
});
