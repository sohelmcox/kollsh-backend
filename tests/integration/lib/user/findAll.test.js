const { findAll } = require("../../../../src/lib/user");
const { User } = require("../../../../src/models");
const { newUserData, userTestData } = require("../../../testSeed/user");

// Mock the User model's methods
jest.mock("../../../../src/models", () => {
  const mockUser = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    User: {
      find: mockUser.find,
      map: mockUser.map,
      count: mockUser.count,
    },
  };
});

describe("User Find Users", () => {
  it("should return users with parameters", async () => {
    // Mock the User model's find method to return a sample user
    const usersData = [
      {
        ...newUserData,
      },
      {
        ...userTestData,
      },
    ];

    User.find.mockResolvedValue(usersData);
    User.map.mockResolvedValue(usersData);
    User.count.mockResolvedValue(2);
    User.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(usersData),
      exec: jest.fn().mockResolvedValue(usersData),
    });

    const params = {
      sort: "name:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "name,email",
      search: { name: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newUserData.id,
          data: {
            id: newUserData.id,
            name: newUserData.name,
            email: newUserData.email,
          },
        },
        {
          id: userTestData.id,
          data: {
            id: userTestData.id,
            name: userTestData.name,
            email: userTestData.email,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: usersData.length,
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
