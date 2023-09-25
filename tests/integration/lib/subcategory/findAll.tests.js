const { findAll } = require("../../../../src/lib/subcategory");
const { Subcategory } = require("../../../../src/models");

jest.mock("../../../../src/models/subcategory");

describe("findAll Service", () => {
  it("should return a list of subcategories with pagination and filters", async () => {
    // Mock input parameters
    const params = {
      sort: "name:asc",
      fields: "name",
      populate: ["relatedField"],
      search: { name: "Example Subcategory" },
      locale: "en",
      pageNumber: 2,
      pageSize: 10,
      pageStart: 10,
      url: "https://example.com",
      path: "/subcategories",
      requestQuery: { filter: "true" },
    };

    // Mock the expected output from the Subcategory model
    const mockSubcategories = [
      {
        id: "subcategory1",
        name: "Subcategory 1",
        description: "Description 1",
      },
      {
        id: "subcategory2",
        name: "Subcategory 2",
        description: "Description 2",
      },
    ];

    // Mock the count result
    const mockTotalCount = 20;

    // Mock the pagination result
    const mockPagination = {
      next: "/subcategories?page=3",
      prev: "/subcategories?page=1",
    };

    // Set up the Subcategory model methods
    Subcategory.find.mockResolvedValue(mockSubcategories);
    Subcategory.count.mockResolvedValue(mockTotalCount);

    // Call the findAll service function
    const result = await findAll({ sort: "name:asc" });

    // Assertions
    expect(result).toBeDefined();
    expect(result.data).toEqual(
      expect.arrayContaining([
        {
          id: "subcategory1",
          data: expect.objectContaining({
            name: "Subcategory 1",
            description: "Description 1",
          }),
        },
        {
          id: "subcategory2",
          data: expect.objectContaining({
            name: "Subcategory 2",
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
        searchQuery: { name: "Example Subcategory" },
      }),
    );
  });

  // Add more test cases as needed
});
