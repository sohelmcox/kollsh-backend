const { findAll } = require("../../../../src/lib/permission");
const { Permission } = require("../../../../src/models");

jest.mock("../../../../src/models/permission");

describe("findAll Service", () => {
  it("should return a list of permissions with pagination and filters", async () => {
    // Mock input parameters
    const params = {
      sort: "name:asc",
      fields: "name",
      populate: ["relatedField"],
      search: { name: "Example Permission" },
      locale: "en",
      pageNumber: 2,
      pageSize: 10,
      pageStart: 10,
      url: "https://example.com",
      path: "/permissions",
      requestQuery: { filter: "true" },
    };

    // Mock the expected output from the Permission model
    const mockPermissions = [
      { id: "permission1", name: "Permission 1", description: "Description 1" },
      { id: "permission2", name: "Permission 2", description: "Description 2" },
    ];

    // Mock the count result
    const mockTotalCount = 20;

    // Mock the pagination result
    const mockPagination = {
      next: "/permissions?page=3",
      prev: "/permissions?page=1",
    };

    // Set up the Permission model methods
    Permission.find.mockResolvedValue(mockPermissions);
    Permission.count.mockResolvedValue(mockTotalCount);

    // Call the findAll service function
    const result = await findAll({ sort: "name:asc" });

    // Assertions
    expect(result).toBeDefined();
    expect(result.data).toEqual(
      expect.arrayContaining([
        {
          id: "permission1",
          data: expect.objectContaining({
            name: "Permission 1",
            description: "Description 1",
          }),
        },
        {
          id: "permission2",
          data: expect.objectContaining({
            name: "Permission 2",
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
        searchQuery: { name: "Example Permission" },
      }),
    );
  });

  // Add more test cases as needed
});
