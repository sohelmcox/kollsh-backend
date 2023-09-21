const { findAll } = require("../../../../src/lib/attributeValue");
const { AttributeValue } = require("../../../../src/models");

jest.mock("../../../../src/models/attributeValue");

describe("findAll Service", () => {
  it("should return a list of attributeValues with pagination and filters", async () => {
    // Mock input parameters
    const params = {
      sort: "name:asc",
      fields: "name",
      populate: ["relatedField"],
      search: { name: "Example AttributeValue" },
      locale: "en",
      pageNumber: 2,
      pageSize: 10,
      pageStart: 10,
      url: "https://example.com",
      path: "/attributeValues",
      requestQuery: { filter: "true" },
    };

    // Mock the expected output from the AttributeValue model
    const mockAttributeValues = [
      {
        id: "attributeValue1",
        name: "AttributeValue 1",
        description: "Description 1",
      },
      {
        id: "attributeValue2",
        name: "AttributeValue 2",
        description: "Description 2",
      },
    ];

    // Mock the count result
    const mockTotalCount = 20;

    // Mock the pagination result
    const mockPagination = {
      next: "/attributeValues?page=3",
      prev: "/attributeValues?page=1",
    };

    // Set up the AttributeValue model methods
    AttributeValue.find.mockResolvedValue(mockAttributeValues);
    AttributeValue.count.mockResolvedValue(mockTotalCount);

    // Call the findAll service function
    const result = await findAll({ sort: "name:asc" });

    // Assertions
    expect(result).toBeDefined();
    expect(result.data).toEqual(
      expect.arrayContaining([
        {
          id: "attributeValue1",
          data: expect.objectContaining({
            name: "AttributeValue 1",
            description: "Description 1",
          }),
        },
        {
          id: "attributeValue2",
          data: expect.objectContaining({
            name: "AttributeValue 2",
            description: "Description 2",
          }),
        },
      ]),
    );
    expect(result.meta.pagination).toEqual(
      expect.objectContaining({
        page: 2,
        limit: 10,
        skip: 10,
        totalEntities: 20,
        totalCount: 20,
      }),
    );
    expect(result.meta.filters).toEqual(
      expect.objectContaining({
        locale: "en",
        sortCriteria: "name",
        selectedFields: ["name", "description"],
        populatedFields: ["relatedField"],
        searchQuery: { name: "Example AttributeValue" },
      }),
    );
  });

  // Add more test cases as needed
});
