const { findAll } = require("../../../../src/lib/subcategory");
const { Subcategory } = require("../../../../src/models");
const {
  newSubcategoryData,
  subcategoryTestData,
} = require("../../../testSeed/subcategory");

// Mock the Subcategory model's methods
jest.mock("../../../../src/models", () => {
  const mockSubcategory = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    Subcategory: {
      find: mockSubcategory.find,
      map: mockSubcategory.map,
      count: mockSubcategory.count,
    },
  };
});

describe("Subcategory Find Subcategories", () => {
  it("should return subcategories with parameters", async () => {
    // Mock the Subcategory model's find method to return a sample subcategory
    const subcategoriesData = [
      {
        ...newSubcategoryData,
      },
      {
        ...subcategoryTestData,
      },
    ];

    Subcategory.find.mockResolvedValue(subcategoriesData);
    Subcategory.map.mockResolvedValue(subcategoriesData);
    Subcategory.count.mockResolvedValue(2);
    Subcategory.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(subcategoriesData),
      exec: jest.fn().mockResolvedValue(subcategoriesData),
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
          id: newSubcategoryData.id,
          data: {
            id: newSubcategoryData.id,
            name: newSubcategoryData.name,
            slug: newSubcategoryData.slug,
          },
        },
        {
          id: subcategoryTestData.id,
          data: {
            id: subcategoryTestData.id,
            name: subcategoryTestData.name,
            slug: subcategoryTestData.slug,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: subcategoriesData.length,
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
