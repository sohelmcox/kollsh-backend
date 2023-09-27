const { findAll } = require("../../../../src/lib/country");
const { Country } = require("../../../../src/models");
const {
  newCountryData,
  countryTestData,
} = require("../../../testSeed/country");

// Mock the Country model's methods
jest.mock("../../../../src/models", () => {
  const mockCountry = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    Country: {
      find: mockCountry.find,
      map: mockCountry.map,
      count: mockCountry.count,
    },
  };
});

describe("Country Find Countries", () => {
  it("should return countries with parameters", async () => {
    // Mock the Country model's find method to return a sample country
    const countriesData = [
      {
        ...newCountryData,
      },
      {
        ...countryTestData,
      },
    ];

    Country.find.mockResolvedValue(countriesData);
    Country.map.mockResolvedValue(countriesData);
    Country.count.mockResolvedValue(2);
    Country.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(countriesData),
      exec: jest.fn().mockResolvedValue(countriesData),
    });

    const params = {
      sort: "name:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "name,code",
      search: { name: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newCountryData.id,
          data: {
            id: newCountryData.id,
            name: newCountryData.name,
            code: newCountryData.code,
          },
        },
        {
          id: countryTestData.id,
          data: {
            id: countryTestData.id,
            name: countryTestData.name,
            code: countryTestData.code,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: countriesData.length,
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
