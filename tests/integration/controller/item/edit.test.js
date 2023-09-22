const request = require("supertest");
const { app } = require("../../../setup/app");
const itemController = require("../../../../src/api/v1/item/controllers");
const itemServices = require("../../../../src/lib/item");
const {
  itemTestUrl,
  mockUpdatedItem,
  editItemData,
} = require("../../../testSeed/item");

// Mock service methods
jest.mock("../../../../src/lib/item", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${itemTestUrl}/:id`, itemController.edit);

describe("Item Edit Controller", () => {
  it("should update an existing item", async () => {
    // Mock the edit method from your service to return an updated item
    itemServices.edit.mockResolvedValue(mockUpdatedItem);

    const response = await request(app)
      .put(`${itemTestUrl}/itemId`)
      .send(editItemData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Item updated successfully");
    expect(response.body.data.id).toBe("itemId");
    expect(response.body.data.name).toBe("Updated Item");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    itemServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${itemTestUrl}/itemId`)
      .send(editItemData);

    expect(response.statusCode).toBe(500);
  });
});
