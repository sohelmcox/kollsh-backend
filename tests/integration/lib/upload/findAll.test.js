const { findAll } = require("../../../../src/lib/upload");
const { Upload } = require("../../../../src/models");
const { newUploadData, uploadTestData } = require("../../../testSeed/upload");

// Mock the Upload model's methods
jest.mock("../../../../src/models", () => {
  const mockUpload = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    Upload: {
      find: mockUpload.find,
      map: mockUpload.map,
      count: mockUpload.count,
    },
  };
});

describe("Upload Find Uploads", () => {
  it("should return uploads with parameters", async () => {
    // Mock the Upload model's find method to return a sample upload
    const uploadsData = [
      {
        ...newUploadData,
      },
      {
        ...uploadTestData,
      },
    ];

    Upload.find.mockResolvedValue(uploadsData);
    Upload.map.mockResolvedValue(uploadsData);
    Upload.count.mockResolvedValue(2);
    Upload.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(uploadsData),
      exec: jest.fn().mockResolvedValue(uploadsData),
    });

    const params = {
      sort: "alternativeText:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "alternativeText",
      search: { alternativeText: "Upload" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newUploadData.id,
          data: {
            id: newUploadData.id,
            alternativeText: newUploadData.alternativeText,
          },
        },
        {
          id: uploadTestData.id,
          data: {
            id: uploadTestData.id,
            alternativeText: uploadTestData.alternativeText,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 2,
          totalCount: uploadsData.length,
        },
        links: expect.any(Object),
        filters: {
          locale: "ar",
          populatedFields: [],
          searchQuery: params.search,
          selectedFields: params.fields.split(","),
          sortCriteria: {
            alternativeText: 1,
          },
        },
      },
    });
  });
});
