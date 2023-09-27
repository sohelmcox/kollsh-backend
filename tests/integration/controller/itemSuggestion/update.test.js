const request = require("supertest");
const { app } = require("../../../setup/app");
const itemSuggestionController = require("../../../../src/api/v1/itemSuggestion/controllers");
const itemSuggestionServices = require("../../../../src/lib/itemSuggestion");
const {
  itemSuggestionTestUrl,
  updatedItemSuggestionData,
  newItemSuggestionData,
  mockUpdatedItemSuggestion,
} = require("../../../testSeed/itemSuggestion");

// Mock service methods
jest.mock("../../../../src/lib/itemSuggestion", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up route
app.put(
  `${itemSuggestionTestUrl}/:id`,
  itemSuggestionController.updateOrCreate,
);

describe("ItemSuggestion Update Controller", () => {
  it("should update an existing itemSuggestion", async () => {
    // Mock the updateOrCreate method from your service to return an updated itemSuggestion

    itemSuggestionServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedItemSuggestion,
      code: 200,
    });

    const response = await request(app)
      .put(`${itemSuggestionTestUrl}/itemSuggestionId`)
      .send(updatedItemSuggestionData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("ItemSuggestion updated successfully");
    expect(response.body.data.id).toBe("itemSuggestionId");
  });

  it("should create a new itemSuggestion if not found", async () => {
    // Mock the updateOrCreate method to create a new itemSuggestion

    itemSuggestionServices.updateOrCreate.mockResolvedValue({
      data: newItemSuggestionData,
      code: 201,
    });

    const response = await request(app)
      .put(`${itemSuggestionTestUrl}/nonExistentId`)
      .send(updatedItemSuggestionData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("ItemSuggestion created successfully");
    expect(response.body.data.id).toBe("6502a59b35d01ff95a2c2528");
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    itemSuggestionServices.updateOrCreate.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .put(`${itemSuggestionTestUrl}/itemSuggestionId`)
      .send(updatedItemSuggestionData);

    expect(response.statusCode).toBe(500);
  });
});
