const { findAll } = require("../../../../src/lib/item");
const { Item } = require("../../../../src/models");
const { newItemData, itemTestData } = require("../../../testSeed/item");

// Mock the Item model's methods
jest.mock("../../../../src/models", () => {
  const mockItem = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    Item: {
      find: mockItem.find,
      map: mockItem.map,
      count: mockItem.count,
    },
  };
});

describe("Item Find Items", () => {
  it("should return items with parameters", async () => {
    // Mock the Item model's find method to return a sample item
    const itemsData = [
      {
        ...newItemData,
      },
      {
        ...itemTestData,
      },
    ];

    Item.find.mockResolvedValue(itemsData);
    Item.map.mockResolvedValue(itemsData);
    Item.count.mockResolvedValue(2);
    Item.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(itemsData),
      exec: jest.fn().mockResolvedValue(itemsData),
    });

    const params = {
      sort: "name:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "name,slug",
      search: { name: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newItemData.id,
          data: {
            id: newItemData.id,
            name: newItemData.name,
            slug: newItemData.slug,
          },
        },
        {
          id: itemTestData.id,
          data: {
            id: itemTestData.id,
            name: itemTestData.name,
            slug: itemTestData.slug,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 2,
          totalCount: itemsData.length,
        },
        links: expect.any(Object),
        filters: {
          locale: "ar",
          populatedFields: [],
          searchQuery: params.search,
          selectedFields: params.fields.split(","),
          sortCriteria: {
            name: 1,
          },
        },
      },
    });
  });
});
