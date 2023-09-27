const { findAll } = require("../../../../src/lib/metadata");
const { Metadata } = require("../../../../src/models");
const {
  newMetadataData,
  metadataTestData,
} = require("../../../testSeed/metadata");

// Mock the Metadata model's methods
jest.mock("../../../../src/models", () => {
  const mockMetadata = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    Metadata: {
      find: mockMetadata.find,
      map: mockMetadata.map,
      count: mockMetadata.count,
    },
  };
});

describe("Metadata Find Metadata", () => {
  it("should return metadata with parameters", async () => {
    // Mock the Metadata model's find method to return a sample metadata
    const metadataData = [
      {
        ...newMetadataData,
      },
      {
        ...metadataTestData,
      },
    ];

    Metadata.find.mockResolvedValue(metadataData);
    Metadata.map.mockResolvedValue(metadataData);
    Metadata.count.mockResolvedValue(2);
    Metadata.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(metadataData),
      exec: jest.fn().mockResolvedValue(metadataData),
    });

    const params = {
      sort: "title:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "title,description",
      search: { title: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newMetadataData.id,
          data: {
            id: newMetadataData.id,
            title: newMetadataData.title,
            description: newMetadataData.description,
          },
        },
        {
          id: metadataTestData.id,
          data: {
            id: metadataTestData.id,
            title: metadataTestData.title,
            description: metadataTestData.description,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 2,
          totalCount: metadataData.length,
        },
        links: expect.any(Object),
        filters: {
          locale: "ar",
          searchQuery: params.search,
          selectedFields: params.fields.split(","),
          sortCriteria: {
            title: 1,
          },
        },
      },
    });
  });
});
