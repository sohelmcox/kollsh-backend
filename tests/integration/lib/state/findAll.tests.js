const { findAll } = require("../../../../src/lib/state");
const { State } = require("../../../../src/models");

jest.mock("../../../../src/models/state");

describe("findAll Service", () => {
  it("should return a list of states with pagination and filters", async () => {
    // Mock input parameters
    const params = {
      sort: "name:asc",
      fields: "name",
      populate: ["relatedField"],
      search: { name: "Example State" },
      locale: "en",
      pageNumber: 2,
      pageSize: 10,
      pageStart: 10,
      url: "https://example.com",
      path: "/states",
      requestQuery: { filter: "true" },
    };

    // Mock the expected output from the State model
    const mockStates = [
      { id: "state1", name: "State 1", description: "Description 1" },
      { id: "state2", name: "State 2", description: "Description 2" },
    ];

    // Mock the count result
    const mockTotalCount = 20;

    // Mock the pagination result
    const mockPagination = {
      next: "/states?page=3",
      prev: "/states?page=1",
    };

    // Set up the State model methods
    State.find.mockResolvedValue(mockStates);
    State.count.mockResolvedValue(mockTotalCount);

    // Call the findAll service function
    const result = await findAll({ sort: "name:asc" });

    // Assertions
    expect(result).toBeDefined();
    expect(result.data).toEqual(
      expect.arrayContaining([
        {
          id: "state1",
          data: expect.objectContaining({
            name: "State 1",
            description: "Description 1",
          }),
        },
        {
          id: "state2",
          data: expect.objectContaining({
            name: "State 2",
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
        searchQuery: { name: "Example State" },
      }),
    );
  });

  // Add more test cases as needed
});
