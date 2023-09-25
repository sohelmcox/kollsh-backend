const { findAll } = require("../../../../src/lib/reply");
const { Reply } = require("../../../../src/models");

jest.mock("../../../../src/models/reply");

describe("findAll Service", () => {
  it("should return a list of replys with pagination and filters", async () => {
    // Mock input parameters
    const params = {
      sort: "name:asc",
      fields: "name",
      populate: ["relatedField"],
      search: { name: "Example Reply" },
      locale: "en",
      pageNumber: 2,
      pageSize: 10,
      pageStart: 10,
      url: "https://example.com",
      path: "/replys",
      requestQuery: { filter: "true" },
    };

    // Mock the expected output from the Reply model
    const mockReplys = [
      { id: "reply1", name: "Reply 1", description: "Description 1" },
      { id: "reply2", name: "Reply 2", description: "Description 2" },
    ];

    // Mock the count result
    const mockTotalCount = 20;

    // Mock the pagination result
    const mockPagination = {
      next: "/replys?page=3",
      prev: "/replys?page=1",
    };

    // Set up the Reply model methods
    Reply.find.mockResolvedValue(mockReplys);
    Reply.count.mockResolvedValue(mockTotalCount);

    // Call the findAll service function
    const result = await findAll({ sort: "name:asc" });

    // Assertions
    expect(result).toBeDefined();
    expect(result.data).toEqual(
      expect.arrayContaining([
        {
          id: "reply1",
          data: expect.objectContaining({
            name: "Reply 1",
            description: "Description 1",
          }),
        },
        {
          id: "reply2",
          data: expect.objectContaining({
            name: "Reply 2",
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
        searchQuery: { name: "Example Reply" },
      }),
    );
  });

  // Add more test cases as needed
});
