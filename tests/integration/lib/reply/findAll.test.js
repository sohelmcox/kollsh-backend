const { findAll } = require("../../../../src/lib/reply");
const { Reply } = require("../../../../src/models");
const { newReplyData, replyTestData } = require("../../../testSeed/reply");

// Mock the Reply model's methods
jest.mock("../../../../src/models", () => {
  const mockReply = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    Reply: {
      find: mockReply.find,
      map: mockReply.map,
      count: mockReply.count,
    },
  };
});

describe("Reply Find Replies", () => {
  it("should return replies with parameters", async () => {
    // Mock the Reply model's find method to return a sample reply
    const repliesData = [
      {
        ...newReplyData,
      },
      {
        ...replyTestData,
      },
    ];

    Reply.find.mockResolvedValue(repliesData);
    Reply.map.mockResolvedValue(repliesData);
    Reply.count.mockResolvedValue(2);
    Reply.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(repliesData),
      exec: jest.fn().mockResolvedValue(repliesData),
    });

    const params = {
      sort: "content:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "content,slug",
      search: { content: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newReplyData.id,
          data: {
            id: newReplyData.id,
            content: newReplyData.content,
          },
        },
        {
          id: replyTestData.id,
          data: {
            id: replyTestData.id,
            content: replyTestData.content,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: repliesData.length,
        },
        links: expect.any(Object),
        filters: {
          locale: "ar",
          populatedFields: [],
          searchQuery: params.search,
          selectedFields: params.fields.split(","),
          sortCriteria: {
            content: 1,
          },
        },
      },
    });
  });
});
