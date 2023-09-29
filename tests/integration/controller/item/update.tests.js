const request = require("supertest");
const { app } = require("../../../setup/app");
const itemController = require("../../../../src/api/v1/item/controllers");
const itemServices = require("../../../../src/lib/item");
const {
  itemTestUrl,
  updatedItemData,
  newItemData,
  mockUpdatedItem,
} = require("../../../testSeed/item");

// Mock service methods
jest.mock("../../../../src/lib/item", () => ({
  updateOrCreate: jest.fn(),
}));
// TODO: fix put route
// Set up route
app.put(`${itemTestUrl}/:id`, itemController.updateOrCreate);

describe("Item Update Controller", () => {
  it("should update an existing item", async () => {
    // Mock the updateOrCreate method from your service to return an updated item

    itemServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedItem,
      code: 200,
    });

    const response = await request(app)
      .put(`${itemTestUrl}/itemId`)
      .send(updatedItemData);
    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Item updated successfully");
    expect(response.body.data.id).toBe("itemId");
    expect(response.body.data.name).toBe("Updated Item");
    expect(response.body.data.negotiable).toBe(true);
  });

  it("should create a new item if not found", async () => {
    // Mock the updateOrCreate method to create a new item

    itemServices.updateOrCreate.mockResolvedValue({
      data: newItemData,
      code: 201,
    });

    const response = await request(app)
      .put(`${itemTestUrl}/nonExistentId`)
      .send(updatedItemData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Item created successfully");
    expect(response.body.data.id).toBe("newItemId");
    expect(response.body.data.name).toBe("New Item");
    expect(response.body.data.negotiable).toBe(true);
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    itemServices.updateOrCreate.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${itemTestUrl}/itemId`)
      .send(updatedItemData);

    expect(response.statusCode).toBe(500);
  });
});
