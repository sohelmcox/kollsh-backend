const request = require("supertest");
const { app } = require("../../../setup/app");
const itemController = require("../../../../src/api/v1/item/controllers");
const itemServices = require("../../../../src/lib/item");
const {
  itemTestUrl,
  createItemData,
  itemTestQuery,
} = require("../../../testSeed/item");

// Mock the required dependencies
jest.mock("../../../../src/lib/item", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(itemTestUrl, itemController.find);

describe("Item Find Controller", () => {
  it("should find items with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of items

    itemServices.findAll.mockResolvedValue(createItemData);

    const response = await request(app).get(itemTestUrl).query(itemTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
