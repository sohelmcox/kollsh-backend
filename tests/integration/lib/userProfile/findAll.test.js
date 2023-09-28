const { findAll } = require("../../../../src/lib/userProfile");
const { UserProfile } = require("../../../../src/models");
const {
  newUserProfileData,
  userProfileTestData,
} = require("../../../testSeed/userProfile");

// Mock the UserProfile model's methods
jest.mock("../../../../src/models", () => {
  const mockUserProfile = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    UserProfile: {
      find: mockUserProfile.find,
      map: mockUserProfile.map,
      count: mockUserProfile.count,
    },
  };
});

describe("UserProfile Find UserProfiles", () => {
  it("should return userProfiles with parameters", async () => {
    // Mock the UserProfile model's find method to return a sample userProfile
    const userProfilesData = [
      {
        ...newUserProfileData,
      },
      {
        ...userProfileTestData,
      },
    ];

    UserProfile.find.mockResolvedValue(userProfilesData);
    UserProfile.map.mockResolvedValue(userProfilesData);
    UserProfile.count.mockResolvedValue(2);
    UserProfile.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(userProfilesData),
      exec: jest.fn().mockResolvedValue(userProfilesData),
    });

    const params = {
      sort: "firstName:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "firstName,lastName",
      search: { firstName: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newUserProfileData.id,
          data: {
            id: newUserProfileData.id,
            firstName: newUserProfileData.firstName,
            lastName: newUserProfileData.lastName,
          },
        },
        {
          id: userProfileTestData.id,
          data: {
            id: userProfileTestData.id,
            firstName: userProfileTestData.firstName,
            lastName: userProfileTestData.lastName,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: userProfilesData.length,
        },
        links: expect.any(Object),
        filters: {
          locale: "ar",
          populatedFields: [],
          searchQuery: params.search,
          selectedFields: params.fields.split(","),
          sortCriteria: {
            firstName: 1,
          },
        },
      },
    });
  });
});
