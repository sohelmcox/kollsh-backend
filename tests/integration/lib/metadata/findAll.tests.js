const { findAll } = require("../../../../src/lib/metadata");
const { Metadata } = require("../../../../src/models");

jest.mock("../../../../src/models/metadata");

describe("findAll Service", () => {
  it("should return a list of metadatas with pagination and filters", async () => {
    // Mock input parameters
    const params = {
      sort: "name:asc",
      fields: "name",
      populate: ["relatedField"],
      search: { name: "Example Metadata" },
      locale: "en",
      pageNumber: 2,
      pageSize: 10,
      pageStart: 10,
      url: "https://example.com",
      path: "/metadatas",
      requestQuery: { filter: "true" },
    };

    // Mock the expected output from the Metadata model
    const mockMetadatas = [
      { id: "metadata1", name: "Metadata 1", description: "Description 1" },
      { id: "metadata2", name: "Metadata 2", description: "Description 2" },
    ];

    // Mock the count result
    const mockTotalCount = 20;

    // Mock the pagination result
    const mockPagination = {
      next: "/metadatas?page=3",
      prev: "/metadatas?page=1",
    };

    // Set up the Metadata model methods
    Metadata.find.mockResolvedValue(mockMetadatas);
    Metadata.count.mockResolvedValue(mockTotalCount);

    // Call the findAll service function
    const result = await findAll({ sort: "name:asc" });

    // Assertions
    expect(result).toBeDefined();
    expect(result.data).toEqual(
      expect.arrayContaining([
        {
          id: "metadata1",
          data: expect.objectContaining({
            name: "Metadata 1",
            description: "Description 1",
          }),
        },
        {
          id: "metadata2",
          data: expect.objectContaining({
            name: "Metadata 2",
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
        searchQuery: { name: "Example Metadata" },
      }),
    );
  });

  // Add more test cases as needed
});
