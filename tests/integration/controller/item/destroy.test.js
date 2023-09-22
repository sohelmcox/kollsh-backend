const request = require("supertest");
const { app } = require("../../../setup/app");
const itemController = require("../../../../src/api/v1/item/controllers");
const itemServices = require("../../../../src/lib/item");
const { itemTestUrl } = require("../../../testSeed/item");

// Mock service methods
jest.mock("../../../../src/lib/item", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${itemTestUrl}/:id`, itemController.destroy);

describe("Item Destroy Controller", () => {
  it("should delete an existing item", async () => {
    // Mock the destroy method from your service to indicate success
    itemServices.destroy.mockResolvedValue();

    const response = await request(app).delete(`${itemTestUrl}/:itemId`);

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    itemServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(`${itemTestUrl}/:itemId`);

    expect(response.statusCode).toBe(500);
  });
});
