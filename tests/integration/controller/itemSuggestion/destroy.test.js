const request = require("supertest");
const { app } = require("../../../setup/app");
const itemSuggestionController = require("../../../../src/api/v1/itemSuggestion/controllers");
const itemSuggestionServices = require("../../../../src/lib/itemSuggestion");
const { itemSuggestionTestUrl } = require("../../../testSeed/itemSuggestion");

// Mock service methods
jest.mock("../../../../src/lib/itemSuggestion", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${itemSuggestionTestUrl}/:id`, itemSuggestionController.destroy);

describe("ItemSuggestion Destroy Controller", () => {
  it("should delete an existing itemSuggestion", async () => {
    // Mock the destroy method from your service to indicate success
    itemSuggestionServices.destroy.mockResolvedValue();

    const response = await request(app).delete(
      `${itemSuggestionTestUrl}/:itemSuggestionId`,
    );

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    itemSuggestionServices.destroy.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app).delete(
      `${itemSuggestionTestUrl}/:itemSuggestionId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
