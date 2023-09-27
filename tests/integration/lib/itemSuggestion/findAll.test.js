const { findAll } = require("../../../../src/lib/itemSuggestion");
const { ItemSuggestion } = require("../../../../src/models");
const {
  newItemSuggestionData,
  itemSuggestionTestData,
} = require("../../../testSeed/itemSuggestion");

// Mock the ItemSuggestion model's methods
jest.mock("../../../../src/models", () => {
  const mockItemSuggestion = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    ItemSuggestion: {
      find: mockItemSuggestion.find,
      map: mockItemSuggestion.map,
      count: mockItemSuggestion.count,
    },
  };
});

describe("ItemSuggestion Find ItemSuggestions", () => {
  it("should return itemSuggestions with parameters", async () => {
    // Mock the ItemSuggestion model's find method to return a sample itemSuggestion
    const itemSuggestionsData = [
      {
        ...newItemSuggestionData,
      },
      {
        ...itemSuggestionTestData,
      },
    ];

    ItemSuggestion.find.mockResolvedValue(itemSuggestionsData);
    ItemSuggestion.map.mockResolvedValue(itemSuggestionsData);
    ItemSuggestion.count.mockResolvedValue(2);
    ItemSuggestion.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(itemSuggestionsData),
      exec: jest.fn().mockResolvedValue(itemSuggestionsData),
    });

    const params = {
      sort: "updatedAt:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "user",
      search: {},
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newItemSuggestionData.id,
          data: {
            id: newItemSuggestionData.id,
            user: newItemSuggestionData.user,
          },
        },
        {
          id: itemSuggestionTestData.id,
          data: {
            id: itemSuggestionTestData.id,
            user: itemSuggestionTestData.user,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 2,
          totalCount: itemSuggestionsData.length,
        },
        links: expect.any(Object),
        filters: {
          locale: "ar",
          populatedFields: [],
          searchQuery: params.search,
          selectedFields: params.fields.split(","),
          sortCriteria: {
            updatedAt: 1,
          },
        },
      },
    });
  });
});
