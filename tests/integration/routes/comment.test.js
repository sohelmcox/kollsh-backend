// setup database test connection
require("../../setup/testSetup");
const { create: createComment } = require("../../../src/lib/comment");
const {
  commentData1,
  commentData2,
  commentTestData,
  createCommentData,
  newCommentData,
  updatedCommentData,
  existingCommentData,
  updatedDescription,
  updatedContent,
} = require("../../testSeed/comment");
const agent = require("../../agent");
const { Comment, User } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const commentTestBaseUrl = `${testBaseUrl}/comments`;
const findCommentByProperty = async (property, value) => {
  const comment = await Comment.findOne({ [property]: value });
  return comment;
};
describe("Comment API Integration Tests", () => {
  beforeEach(async () => {
    createCommentData.forEach(async (comment) => {
      await createComment({ ...comment });
    });
    await createTestUser();
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await Comment.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new Comment", () => {
    it("should create a new comment POST", async () => {
      const response = await agent
        .post(commentTestBaseUrl)
        .send(newCommentData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.content).toBe(newCommentData.content);
    });
  });
  describe("Retrieve Multiple Comments", () => {
    it("should retrieve a list of comments GET:", async () => {
      const response = await agent.get(commentTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Comments", () => {
    it("should delete multiple comments by their IDs DELETE:", async () => {
      // Create test data by inserting comment records into the database
      const comment1 = await createComment({ ...commentData1 });
      const comment2 = await createComment({ ...commentData2 });

      // Retrieve the IDs of the created comment records
      const commentIdsToDelete = [comment1.id, comment2.id];
      // Delete multiple comments by their IDs
      const response = await agent
        .delete(commentTestBaseUrl)
        .send({ ids: commentIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the comments with the specified IDs no longer exist in the database
      for (const commentId of commentIdsToDelete) {
        const deletedComment = await Comment.findById(commentId);
        expect(deletedComment).toBeNull();
      }
    });
  });
  describe("Retrieve Single Comments", () => {
    it("should find a single comment by its ID GET:", async () => {
      // Create a test comment record in the database
      const testComment = await createComment({ ...commentTestData });

      // Perform a GET request to find the comment by its ID
      const response = await agent
        .get(`${commentTestBaseUrl}/${testComment.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testComment
      expect(response.body.id).toBe(String(testComment.id));
      expect(response.body.data.content).toBe(testComment.content);
    });
  });
  describe("Update and Delete Comments", () => {
    it("should update a comment by Id or create a new one if not found PUT", async () => {
      // Create a test comment record in the database
      const existingComment = await createComment(existingCommentData);
      // Perform a PUT request to update the comment by name
      const response = await agent
        .put(`${commentTestBaseUrl}/${existingComment.id}`)
        .send(updatedCommentData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.data.content).toBe(updatedCommentData.content);

      // Verify that the comment with the updated name and description exists in the database
      const updatedCommentInDB = await findCommentByProperty(
        "content",
        updatedCommentData.content,
      );
      expect(updatedCommentInDB).not.toBeNull();

      // Create data for a comment that doesn't exist in the database
      // Perform a PUT request to create a new comment
      const createResponse = await agent
        .put(`${commentTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newCommentData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.content).toBe(newCommentData.content);
      // expect(createResponse.body.data.itemDetails).toBe(
      //   newCommentData.itemDetails,
      // );

      // Verify that the new comment exists in the database
      const newCommentInDB = await findCommentByProperty(
        "content",
        newCommentData.content,
      );
      expect(newCommentInDB).not.toBeNull();
    });
    it("should edit an existing comment PATCH", async () => {
      // Find an existing comment (assuming it exists)
      const commentToUpdate = await findCommentByProperty(
        "content",
        "comment name",
      );

      // If a comment with the specified name exists, update it
      const response = await agent
        .patch(`${commentTestBaseUrl}/${commentToUpdate._id}`)
        .send(updatedContent)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.content).toBe(updatedCommentData.content);
    });
    it("should delete a comment DELETE", async () => {
      const commentToDelete = await findCommentByProperty(
        "content",
        "comment name",
      );

      const response = await agent
        .delete(`${commentTestBaseUrl}/${commentToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Comment.findById(commentToDelete._id)).toBeNull();
    });
  });
});
