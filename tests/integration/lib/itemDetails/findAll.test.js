const { findAll } = require("../../../../src/lib/itemDetails");
const { ItemDetails } = require("../../../../src/models");
const {
  newItemDetailsData,
  itemDetailsTestData,
} = require("../../../testSeed/itemDetails");

// Mock the ItemDetails model's methods
jest.mock("../../../../src/models", () => {
  const mockItemDetails = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    ItemDetails: {
      find: mockItemDetails.find,
      map: mockItemDetails.map,
      count: mockItemDetails.count,
    },
  };
});

describe("ItemDetails Find ItemDetails", () => {
  it("should return itemDetails with parameters", async () => {
    // Mock the ItemDetails model's find method to return a sample itemDetails
    const itemDetailsData = [
      {
        ...newItemDetailsData,
      },
      {
        ...itemDetailsTestData,
      },
    ];

    ItemDetails.find.mockResolvedValue(itemDetailsData);
    ItemDetails.map.mockResolvedValue(itemDetailsData);
    ItemDetails.count.mockResolvedValue(2);
    ItemDetails.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(itemDetailsData),
      exec: jest.fn().mockResolvedValue(itemDetailsData),
    });

    const params = {
      sort: "updatedAt:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "description,email",
      search: { description: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newItemDetailsData.id,
          data: {
            id: newItemDetailsData.id,
            description: newItemDetailsData.description,
            email: newItemDetailsData.email,
          },
        },
        {
          id: itemDetailsTestData.id,
          data: {
            id: itemDetailsTestData.id,
            description: itemDetailsTestData.description,
            email: itemDetailsTestData.email,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: itemDetailsData.length,
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
