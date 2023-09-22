const { updateOrCreate } = require("../../../../src/lib/comment");
const { Comment } = require("../../../../src/models");
const {
  newCommentData,
  existingComment,
} = require("../../../testSeed/comment");
// Mock the Comment model's methods
jest.mock("../../../../src/models", () => {
  const mockComment = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    Comment: {
      findById: mockComment.findById,
      findOne: mockComment.findOne,
      create: mockComment.create,
    },
  };
});

describe("Comment Update or Create Service", () => {
  it("should create a new comment", async () => {
    // Mock the findById method to return null, indicating the comment does not exist
    Comment.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the comment name is not found
    Comment.findOne.mockResolvedValue(null);

    // Mock the create method to return a new comment instance
    const createdCommentInstance = {
      id: "newCommentId",
      ...newCommentData,
      save: jest.fn(),
    };
    Comment.create.mockReturnValue(createdCommentInstance);

    const result = await updateOrCreate("newCommentId", { ...newCommentData });
    // console.log(result);
    expect(result.code).toBe(201);
  });
});
