const request = require("supertest");
const { app } = require("../../../setup/app");
const itemSuggestionController = require("../../../../src/api/v1/itemSuggestion/controllers");
const itemSuggestionServices = require("../../../../src/lib/itemSuggestion");
const {
  itemSuggestionTestUrl,
  createItemSuggestionData,
  itemSuggestionTestQuery,
} = require("../../../testSeed/itemSuggestion");

// Mock the required dependencies
jest.mock("../../../../src/lib/itemSuggestion", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(itemSuggestionTestUrl, itemSuggestionController.find);

describe("ItemSuggestion Find Controller", () => {
  it("should find itemSuggestions with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of itemSuggestions

    itemSuggestionServices.findAll.mockResolvedValue(createItemSuggestionData);

    const response = await request(app)
      .get(itemSuggestionTestUrl)
      .query(itemSuggestionTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
