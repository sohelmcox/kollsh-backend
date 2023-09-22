const request = require("supertest");
const { app } = require("../../../setup/app");
const itemDetailsController = require("../../../../src/api/v1/itemDetails/controllers");
const itemDetailsServices = require("../../../../src/lib/itemDetails");
const {
  itemDetailsTestUrl,
  createItemDetailsData,
  itemDetailsTestQuery,
} = require("../../../testSeed/itemDetails");

// Mock the required dependencies
jest.mock("../../../../src/lib/itemDetails", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(itemDetailsTestUrl, itemDetailsController.find);

describe("ItemDetails Find Controller", () => {
  it("should find itemDetails with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of itemDetails

    itemDetailsServices.findAll.mockResolvedValue(createItemDetailsData);

    const response = await request(app)
      .get(itemDetailsTestUrl)
      .query(itemDetailsTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
