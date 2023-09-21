const { findAll } = require("../../../../src/lib/attribute");
const { Attribute } = require("../../../../src/models");

jest.mock("../../../../src/models/attribute");

describe("findAll Service", () => {
  it("should return a list of attributes with pagination and filters", async () => {
    // Mock input parameters
    const params = {
      sort: "name:asc",
      fields: "name",
      populate: ["relatedField"],
      search: { name: "Example Attribute" },
      locale: "en",
      pageNumber: 2,
      pageSize: 10,
      pageStart: 10,
      url: "https://example.com",
      path: "/attributes",
      requestQuery: { filter: "true" },
    };

    // Mock the expected output from the Attribute model
    const mockAttributes = [
      { id: "attribute1", name: "Attribute 1", description: "Description 1" },
      { id: "attribute2", name: "Attribute 2", description: "Description 2" },
    ];

    // Mock the count result
    const mockTotalCount = 20;

    // Mock the pagination result
    const mockPagination = {
      next: "/attributes?page=3",
      prev: "/attributes?page=1",
    };

    // Set up the Attribute model methods
    Attribute.find.mockResolvedValue(mockAttributes);
    Attribute.count.mockResolvedValue(mockTotalCount);

    // Call the findAll service function
    const result = await findAll({ sort: "name:asc" });

    // Assertions
    expect(result).toBeDefined();
    expect(result.data).toEqual(
      expect.arrayContaining([
        {
          id: "attribute1",
          data: expect.objectContaining({
            name: "Attribute 1",
            description: "Description 1",
          }),
        },
        {
          id: "attribute2",
          data: expect.objectContaining({
            name: "Attribute 2",
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
        searchQuery: { name: "Example Attribute" },
      }),
    );
  });

  // Add more test cases as needed
});
