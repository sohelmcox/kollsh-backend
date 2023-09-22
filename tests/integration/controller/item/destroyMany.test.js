const request = require("supertest");
const { app } = require("../../../setup/app");
const itemController = require("../../../../src/api/v1/item/controllers");
const itemServices = require("../../../../src/lib/item");
const { itemTestUrl } = require("../../../testSeed/item");

// Mock service methods
jest.mock("../../../../src/lib/item", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(itemTestUrl, itemController.destroyMany);

describe("Item DestroyMany Controller", () => {
  it("should delete multiple items with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted items
    itemServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(itemTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 items deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    itemServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(itemTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    itemServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(itemTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
