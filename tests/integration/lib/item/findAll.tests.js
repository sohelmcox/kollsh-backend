const { findAll } = require("../../../../src/lib/item");
const { Item } = require("../../../../src/models");

jest.mock("../../../../src/models/item");

describe("findAll Service", () => {
  it("should return a list of items with pagination and filters", async () => {
    // Mock input parameters
    const params = {
      sort: "name:asc",
      fields: "name",
      populate: ["relatedField"],
      search: { name: "Example Item" },
      locale: "en",
      pageNumber: 2,
      pageSize: 10,
      pageStart: 10,
      url: "https://example.com",
      path: "/items",
      requestQuery: { filter: "true" },
    };

    // Mock the expected output from the Item model
    const mockItems = [
      { id: "item1", name: "Item 1", description: "Description 1" },
      { id: "item2", name: "Item 2", description: "Description 2" },
    ];

    // Mock the count result
    const mockTotalCount = 20;

    // Mock the pagination result
    const mockPagination = {
      next: "/items?page=3",
      prev: "/items?page=1",
    };

    // Set up the Item model methods
    Item.find.mockResolvedValue(mockItems);
    Item.count.mockResolvedValue(mockTotalCount);

    // Call the findAll service function
    const result = await findAll({ sort: "name:asc" });

    // Assertions
    expect(result).toBeDefined();
    expect(result.data).toEqual(
      expect.arrayContaining([
        {
          id: "item1",
          data: expect.objectContaining({
            name: "Item 1",
            description: "Description 1",
          }),
        },
        {
          id: "item2",
          data: expect.objectContaining({
            name: "Item 2",
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
        searchQuery: { name: "Example Item" },
      }),
    );
  });

  // Add more test cases as needed
});
