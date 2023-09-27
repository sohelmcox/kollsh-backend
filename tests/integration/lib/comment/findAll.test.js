const { findAll } = require("../../../../src/lib/comment");
const { Comment } = require("../../../../src/models");
const {
  newCommentData,
  commentTestData,
} = require("../../../testSeed/comment");

// Mock the Comment model's methods
jest.mock("../../../../src/models", () => {
  const mockComment = {
    find: jest.fn(),
    count: jest.fn(),
    map: jest.fn(),
  };

  return {
    Comment: {
      find: mockComment.find,
      map: mockComment.map,
      count: mockComment.count,
    },
  };
});

describe("Comment Find Comments", () => {
  it("should return comments with parameters", async () => {
    // Mock the Comment model's find method to return a sample comment
    const commentsData = [
      {
        ...newCommentData,
      },
      {
        ...commentTestData,
      },
    ];

    Comment.find.mockResolvedValue(commentsData);
    Comment.map.mockResolvedValue(commentsData);
    Comment.count.mockResolvedValue(2);
    Comment.find.mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(commentsData),
      exec: jest.fn().mockResolvedValue(commentsData),
    });

    const params = {
      sort: "content:asc",
      pageNumber: 1,
      pageSize: 25,
      pageStart: 0,
      fields: "content",
      search: { content: "string" },
      locale: "ar",
    };

    const result = await findAll(params);

    // Verify the result
    expect(result).toEqual({
      data: [
        {
          id: newCommentData.id,
          data: {
            id: newCommentData.id,
            content: newCommentData.content,
          },
        },
        {
          id: commentTestData.id,
          data: {
            id: commentTestData.id,
            content: commentTestData.content,
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          limit: 25,
          skip: 0,
          totalEntities: 1,
          totalCount: commentsData.length,
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
