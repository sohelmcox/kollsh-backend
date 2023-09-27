const { findAll } = require("../../../../src/lib/attributeValue");
const { AttributeValue } = require("../../../../src/models");
const {
  newAttributeValueData,
  attributeValueTestData,
} = require("../../../testSeed/attributeValue");

// Mock the AttributeValue model's methods
jest.mock("../../../../src/models", () => {
  const mockAttributeValue = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    AttributeValue: {
      find: mockAttributeValue.find,
      map: mockAttributeValue.map,
      count: mockAttributeValue.count,
    },
  };
});

describe("AttributeValue Find AttributeValues", () => {
  it("should return attributeValues with parameters", async () => {
    // Mock the AttributeValue model's find method to return a sample attributeValue
    const attributeValuesData = [
      {
        ...newAttributeValueData,
      },
      {
        ...attributeValueTestData,
      },
    ];

    AttributeValue.find.mockResolvedValue(attributeValuesData);
    AttributeValue.map.mockResolvedValue(attributeValuesData);
    AttributeValue.count.mockResolvedValue(2);
    AttributeValue.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(attributeValuesData),
      exec: jest.fn().mockResolvedValue(attributeValuesData),
    });

    const params = {
      sort: "name:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "name,value",
      search: { name: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newAttributeValueData.id,
          data: {
            id: newAttributeValueData.id,
            name: newAttributeValueData.name,
            value: newAttributeValueData.value,
          },
        },
        {
          id: attributeValueTestData.id,
          data: {
            id: attributeValueTestData.id,
            name: attributeValueTestData.name,
            value: attributeValueTestData.value,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: attributeValuesData.length,
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
