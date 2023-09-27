const request = require("supertest");
const { app } = require("../../../setup/app");
const itemSuggestionController = require("../../../../src/api/v1/itemSuggestion/controllers");
const itemSuggestionServices = require("../../../../src/lib/itemSuggestion");
const {
  itemSuggestionTestUrl,
  mockUpdatedItemSuggestion,
  editItemSuggestionData,
} = require("../../../testSeed/itemSuggestion");

// Mock service methods
jest.mock("../../../../src/lib/itemSuggestion", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${itemSuggestionTestUrl}/:id`, itemSuggestionController.edit);

describe("ItemSuggestion Edit Controller", () => {
  it("should update an existing itemSuggestion", async () => {
    // Mock the edit method from your service to return an updated itemSuggestion
    itemSuggestionServices.edit.mockResolvedValue(mockUpdatedItemSuggestion);

    const response = await request(app)
      .put(`${itemSuggestionTestUrl}/itemSuggestionId`)
      .send(editItemSuggestionData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("ItemSuggestion updated successfully");
    expect(response.body.data.id).toBe("itemSuggestionId");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    itemSuggestionServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${itemSuggestionTestUrl}/itemSuggestionId`)
      .send(editItemSuggestionData);

    expect(response.statusCode).toBe(500);
  });
});
