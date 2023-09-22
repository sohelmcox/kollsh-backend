const { findAll } = require("../../../../src/lib/brand");
const { Brand } = require("../../../../src/models");

jest.mock("../../../../src/models/brand");

describe("findAll Service", () => {
  it("should return a list of brands with pagination and filters", async () => {
    // Mock input parameters
    const params = {
      sort: "name:asc",
      fields: "name",
      populate: ["relatedField"],
      search: { name: "Example Brand" },
      locale: "en",
      pageNumber: 2,
      pageSize: 10,
      pageStart: 10,
      url: "https://example.com",
      path: "/brands",
      requestQuery: { filter: "true" },
    };

    // Mock the expected output from the Brand model
    const mockBrands = [
      { id: "brand1", name: "Brand 1", description: "Description 1" },
      { id: "brand2", name: "Brand 2", description: "Description 2" },
    ];

    // Mock the count result
    const mockTotalCount = 20;

    // Mock the pagination result
    const mockPagination = {
      next: "/brands?page=3",
      prev: "/brands?page=1",
    };

    // Set up the Brand model methods
    Brand.find.mockResolvedValue(mockBrands);
    Brand.count.mockResolvedValue(mockTotalCount);

    // Call the findAll service function
    const result = await findAll({ sort: "name:asc" });

    // Assertions
    expect(result).toBeDefined();
    expect(result.data).toEqual(
      expect.arrayContaining([
        {
          id: "brand1",
          data: expect.objectContaining({
            name: "Brand 1",
            description: "Description 1",
          }),
        },
        {
          id: "brand2",
          data: expect.objectContaining({
            name: "Brand 2",
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
        searchQuery: { name: "Example Brand" },
      }),
    );
  });

  // Add more test cases as needed
});
