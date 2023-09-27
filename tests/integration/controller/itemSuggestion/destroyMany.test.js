const request = require("supertest");
const { app } = require("../../../setup/app");
const itemSuggestionController = require("../../../../src/api/v1/itemSuggestion/controllers");
const itemSuggestionServices = require("../../../../src/lib/itemSuggestion");
const { itemSuggestionTestUrl } = require("../../../testSeed/itemSuggestion");

// Mock service methods
jest.mock("../../../../src/lib/itemSuggestion", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(itemSuggestionTestUrl, itemSuggestionController.destroyMany);

describe("ItemSuggestion DestroyMany Controller", () => {
  it("should delete multiple itemSuggestions with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted itemSuggestions
    itemSuggestionServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(itemSuggestionTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 itemSuggestions deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    itemSuggestionServices.destroyMany.mockRejectedValue(
      new Error("Invalid IDs"),
    );

    const response = await request(app)
      .delete(itemSuggestionTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    itemSuggestionServices.destroyMany.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .delete(itemSuggestionTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
