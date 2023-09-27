const { findAll } = require("../../../../src/lib/category");
const { Category } = require("../../../../src/models");
const {
  newCategoryData,
  categoryTestData,
} = require("../../../testSeed/category");

// Mock the Category model's methods
jest.mock("../../../../src/models", () => {
  const mockCategory = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    Category: {
      find: mockCategory.find,
      map: mockCategory.map,
      count: mockCategory.count,
    },
  };
});

describe("Brand Find Categories", () => {
  it("should return categories with parameters", async () => {
    // Mock the Category model's find method to return a sample category
    const categoriesData = [
      {
        ...newCategoryData,
      },
      {
        ...categoryTestData,
      },
    ];

    Category.find.mockResolvedValue(categoriesData);
    Category.map.mockResolvedValue(categoriesData);
    Category.count.mockResolvedValue(2);
    Category.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(categoriesData),
      exec: jest.fn().mockResolvedValue(categoriesData),
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
          id: newCategoryData.id,
          data: {
            id: newCategoryData.id,
            name: newCategoryData.name,
            slug: newCategoryData.slug,
          },
        },
        {
          id: categoryTestData.id,
          data: {
            id: categoryTestData.id,
            name: categoryTestData.name,
            slug: categoryTestData.slug,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: categoriesData.length,
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
