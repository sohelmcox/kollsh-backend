const request = require("supertest");
const { app } = require("../../../setup/app");
const itemController = require("../../../../src/api/v1/item/controllers");
const itemServices = require("../../../../src/lib/item");
const { itemTestUrl, mockItem } = require("../../../testSeed/item");

// Mock service methods
jest.mock("../../../../src/lib/item", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${itemTestUrl}/:id`, itemController.findSingle);

describe("Item FindSingle Controller", () => {
  it("should find a single item by ID", async () => {
    // Mock the findSingle method from your service to return a item

    itemServices.findSingle.mockResolvedValue(mockItem);

    const response = await request(app).get(`${itemTestUrl}/itemId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("itemId");
    expect(response.body.data.name).toBe("Test Item");
    expect(response.body.data.negotiable).toBe(true);
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    itemServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${itemTestUrl}/itemId`);

    expect(response.statusCode).toBe(500);
  });
});
