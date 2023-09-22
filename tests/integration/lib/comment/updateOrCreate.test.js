const { updateOrCreate } = require("../../../../src/lib/comment");
const { Comment } = require("../../../../src/models");
const {
  newCommentData,
  updatedCommentData,
  existingCommentData,
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
  it("should create a new comment if it does not exist", async () => {
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
  it("should update an existing comment if it exists", async () => {
    // Mock an existing comment
    const existingComment = {
      id: "existingCommentId",
      name: "Existing Comment",
      itemDetails: "existing-image.jpg",
      priority: 1,
      overwrite: jest.fn(),
      save: jest.fn(),
    };
    Comment.findById.mockResolvedValue(existingComment);

    // Mock the findOne method to return null, indicating the comment name is not found
    Comment.findOne.mockResolvedValue(null);

    const result = await updateOrCreate(
      "existingCommentId",
      updatedCommentData,
    );

    // Verify that the findById method was called with the correct ID
    expect(Comment.findById).toHaveBeenCalledWith("existingCommentId");

    // Verify that the overwrite and save methods were called on the existing comment
    expect(existingComment.overwrite).toHaveBeenCalledWith({
      content: updatedCommentData.content,
      itemDetails: updatedCommentData.itemDetails,
    });
    expect(existingComment.save).toHaveBeenCalled();

    // Verify the result
    // expect(result.data).toEqual({ ...existingComment });
    expect(result.code).toBe(200);
  });
});
