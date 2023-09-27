const { findAll } = require("../../../../src/lib/city");
const { City } = require("../../../../src/models");
const { newCityData, cityTestData } = require("../../../testSeed/city");

// Mock the City model's methods
jest.mock("../../../../src/models", () => {
  const mockCity = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    City: {
      find: mockCity.find,
      map: mockCity.map,
      count: mockCity.count,
    },
  };
});

describe("City Find Cities", () => {
  it("should return cities with parameters", async () => {
    // Mock the City model's find method to return a sample city
    const citiesData = [
      {
        ...newCityData,
      },
      {
        ...cityTestData,
      },
    ];

    City.find.mockResolvedValue(citiesData);
    City.map.mockResolvedValue(citiesData);
    City.count.mockResolvedValue(2);
    City.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(citiesData),
      exec: jest.fn().mockResolvedValue(citiesData),
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
          id: newCityData.id,
          data: {
            id: newCityData.id,
            name: newCityData.name,
            slug: newCityData.slug,
          },
        },
        {
          id: cityTestData.id,
          data: {
            id: cityTestData.id,
            name: cityTestData.name,
            slug: cityTestData.slug,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: citiesData.length,
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
