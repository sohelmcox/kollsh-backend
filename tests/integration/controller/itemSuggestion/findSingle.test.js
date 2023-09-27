const request = require("supertest");
const { app } = require("../../../setup/app");
const itemSuggestionController = require("../../../../src/api/v1/itemSuggestion/controllers");
const itemSuggestionServices = require("../../../../src/lib/itemSuggestion");
const {
  itemSuggestionTestUrl,
  mockItemSuggestion,
} = require("../../../testSeed/itemSuggestion");

// Mock service methods
jest.mock("../../../../src/lib/itemSuggestion", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${itemSuggestionTestUrl}/:id`, itemSuggestionController.findSingle);

describe("ItemSuggestion FindSingle Controller", () => {
  it("should find a single itemSuggestion by ID", async () => {
    // Mock the findSingle method from your service to return a itemSuggestion

    itemSuggestionServices.findSingle.mockResolvedValue(mockItemSuggestion);

    const response = await request(app).get(
      `${itemSuggestionTestUrl}/6502a57b35d01ff95a2c2521`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("6502a57b35d01ff95a2c2521");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    itemSuggestionServices.findSingle.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app).get(
      `${itemSuggestionTestUrl}/itemSuggestionId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
