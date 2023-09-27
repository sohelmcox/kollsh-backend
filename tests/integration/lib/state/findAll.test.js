const { findAll } = require("../../../../src/lib/state");
const { State } = require("../../../../src/models");
const { newStateData, stateTestData } = require("../../../testSeed/state");

// Mock the State model's methods
jest.mock("../../../../src/models", () => {
  const mockState = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    State: {
      find: mockState.find,
      map: mockState.map,
      count: mockState.count,
    },
  };
});

describe("State Find States", () => {
  it("should return states with parameters", async () => {
    // Mock the State model's find method to return a sample state
    const statesData = [
      {
        ...newStateData,
      },
      {
        ...stateTestData,
      },
    ];

    State.find.mockResolvedValue(statesData);
    State.map.mockResolvedValue(statesData);
    State.count.mockResolvedValue(2);
    State.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(statesData),
      exec: jest.fn().mockResolvedValue(statesData),
    });

    const params = {
      sort: "name:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "name,priority",
      search: { name: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newStateData.id,
          data: {
            id: newStateData.id,
            name: newStateData.name,
            priority: newStateData.priority,
          },
        },
        {
          id: stateTestData.id,
          data: {
            id: stateTestData.id,
            name: stateTestData.name,
            priority: stateTestData.priority,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: statesData.length,
        },
        links: expect.any(Object),
        filters: {
          locale: "ar",
          populatedFields: [],
          searchQuery: params.search,
          selectedFields: params.fields.split(","),
          sortCriteria: {
            name: 1,
          },
        },
      },
    });
  });
});
