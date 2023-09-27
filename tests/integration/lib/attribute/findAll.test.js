const { findAll } = require("../../../../src/lib/attribute");
const { Attribute } = require("../../../../src/models");
const {
  newAttributeData,
  attributeTestData,
} = require("../../../testSeed/attribute");

// Mock the Attribute model's methods
jest.mock("../../../../src/models", () => {
  const mockAttribute = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    Attribute: {
      find: mockAttribute.find,
      map: mockAttribute.map,
      count: mockAttribute.count,
    },
  };
});

describe("Attribute Find Attributes", () => {
  it("should return attributes with parameters", async () => {
    // Mock the Attribute model's find method to return a sample attribute
    const attributesData = [
      {
        ...newAttributeData,
      },
      {
        ...attributeTestData,
      },
    ];

    Attribute.find.mockResolvedValue(attributesData);
    Attribute.map.mockResolvedValue(attributesData);
    Attribute.count.mockResolvedValue(2);
    Attribute.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(attributesData),
      exec: jest.fn().mockResolvedValue(attributesData),
    });

    const params = {
      sort: "name:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "name",
      search: { name: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newAttributeData.id,
          data: {
            id: newAttributeData.id,
            name: newAttributeData.name,
          },
        },
        {
          id: attributeTestData.id,
          data: {
            id: attributeTestData.id,
            name: attributeTestData.name,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: attributesData.length,
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
