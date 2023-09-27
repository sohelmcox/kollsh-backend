const request = require("supertest");
const { app } = require("../../../setup/app");
const itemSuggestionController = require("../../../../src/api/v1/itemSuggestion/controllers");
const itemSuggestionServices = require("../../../../src/lib/itemSuggestion");
const {
  itemSuggestionTestUrl,
  itemSuggestionTestData,
} = require("../../../testSeed/itemSuggestion");
// Mock service methods
jest.mock("../../../../src/lib/itemSuggestion", () => ({
  create: jest.fn(),
}));

// Set up route
app.post(itemSuggestionTestUrl, itemSuggestionController.create);

describe("ItemSuggestion Controller", () => {
  it("should create a new itemSuggestion", async () => {
    // Mock the create method from your service to return a sample itemSuggestion

    itemSuggestionServices.create.mockResolvedValue(itemSuggestionTestData);

    const response = await request(app)
      .post(itemSuggestionTestUrl)
      .send(itemSuggestionTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("ItemSuggestion Created Successfully");
    expect(response.body.data).toEqual(itemSuggestionTestData);
  });
});
