const { findAll } = require("../../../../src/lib/category");
const { Category } = require("../../../../src/models");

jest.mock("../../../../src/models/category");

describe("findAll Service", () => {
  it("should return a list of categories with pagination and filters", async () => {
    // Mock input parameters
    const params = {
      sort: "name:asc",
      fields: "name",
      populate: ["relatedField"],
      search: { name: "Example Category" },
      locale: "en",
      pageNumber: 2,
      pageSize: 10,
      pageStart: 10,
      url: "https://example.com",
      path: "/categories",
      requestQuery: { filter: "true" },
    };

    // Mock the expected output from the Category model
    const mockCategories = [
      { id: "category1", name: "Category 1", description: "Description 1" },
      { id: "category2", name: "Category 2", description: "Description 2" },
    ];

    // Mock the count result
    const mockTotalCount = 20;

    // Mock the pagination result
    const mockPagination = {
      next: "/categories?page=3",
      prev: "/categories?page=1",
    };

    // Set up the Category model methods
    Category.find.mockResolvedValue(mockCategories);
    Category.count.mockResolvedValue(mockTotalCount);

    // Call the findAll service function
    const result = await findAll({ sort: "name:asc" });

    // Assertions
    expect(result).toBeDefined();
    expect(result.data).toEqual(
      expect.arrayContaining([
        {
          id: "category1",
          data: expect.objectContaining({
            name: "Category 1",
            featured: true,
          }),
        },
        {
          id: "category2",
          data: expect.objectContaining({
            name: "Category 2",
            featured: false,
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
        selectedFields: ["name", "priority"],
        populatedFields: ["relatedField"],
        searchQuery: { name: "Example Category" },
      }),
    );
  });
});
