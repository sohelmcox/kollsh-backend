const { findAll } = require("../../../../src/lib/brand");
const { Brand } = require("../../../../src/models");
const { newBrandData, brandTestData } = require("../../../testSeed/brand");

// Mock the Brand model's methods
jest.mock("../../../../src/models", () => {
  const mockBrand = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    Brand: {
      find: mockBrand.find,
      map: mockBrand.map,
      count: mockBrand.count,
    },
  };
});

describe("Brand Find Brands", () => {
  it("should return brands with parameters", async () => {
    // Mock the Brand model's find method to return a sample brand
    const brandsData = [
      {
        ...newBrandData,
      },
      {
        ...brandTestData,
      },
    ];

    Brand.find.mockResolvedValue(brandsData);
    Brand.map.mockResolvedValue(brandsData);
    Brand.count.mockResolvedValue(2);
    Brand.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(brandsData),
      exec: jest.fn().mockResolvedValue(brandsData),
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
          id: newBrandData.id,
          data: {
            id: newBrandData.id,
            name: newBrandData.name,
            slug: newBrandData.slug,
          },
        },
        {
          id: brandTestData.id,
          data: {
            id: brandTestData.id,
            name: brandTestData.name,
            slug: brandTestData.slug,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: brandsData.length,
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
