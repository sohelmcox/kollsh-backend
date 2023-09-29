const { findAll } = require("../../../../src/lib/permission");
const { Permission } = require("../../../../src/models");
const {
  newPermissionData,
  permissionTestData,
} = require("../../../testSeed/permission");

// Mock the Permission model's methods
jest.mock("../../../../src/models", () => {
  const mockPermission = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    Permission: {
      find: mockPermission.find,
      map: mockPermission.map,
      count: mockPermission.count,
    },
  };
});

describe("Permission Find Permissions", () => {
  it("should return permissions with parameters", async () => {
    // Mock the Permission model's find method to return a sample permission
    const permissionsData = [
      {
        ...newPermissionData,
      },
      {
        ...permissionTestData,
      },
    ];

    Permission.find.mockResolvedValue(permissionsData);
    Permission.map.mockResolvedValue(permissionsData);
    Permission.count.mockResolvedValue(2);
    Permission.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(permissionsData),
      exec: jest.fn().mockResolvedValue(permissionsData),
    });

    const params = {
      sort: "description:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "description",
      search: { description: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newPermissionData.id,
          data: {
            id: newPermissionData.id,
            description: newPermissionData.description,
          },
        },
        {
          id: permissionTestData.id,
          data: {
            id: permissionTestData.id,
            description: permissionTestData.description,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: permissionsData.length,
        },
        links: expect.any(Object),
        filters: {
          locale: "ar",
          searchQuery: params.search,
          selectedFields: params.fields.split(","),
          sortCriteria: {
            description: 1,
          },
        },
      },
    });
  });
});
