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
  updatedContent,
  permissionsData,
  rolesData,
} = require("../../testSeed/comment");
const agent = require("../../agent");
const { Comment, User, Role, Permission } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const commentTestBaseUrl = `${testBaseUrl}/comments`;

describe("Comment API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial comments
    await Promise.all(
      createCommentData.map(async (comment) => {
        await createComment({ ...comment, author: user.id });
      }),
    );
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await Comment.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await User.deleteMany({});
  });

  describe("Create, Retrieve, Update, and Delete Comments", () => {
    it("should create a new comment POST", async () => {
      const response = await agent
        .post(commentTestBaseUrl)
        .send(newCommentData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(201);
      expect(response.body.data.content).toBe(newCommentData.content);
    });

    it("should retrieve a list of comments GET", async () => {
      const response = await agent.get(commentTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });

    it("should update a comment by Id or create a new one if not found PUT", async () => {
      // Find an existing comment (assuming it exists)
      const existingComment = await createComment({
        ...existingCommentData,
        author: user.id,
      });

      // Perform a PUT request to update the comment by name
      const response = await agent
        .put(`${commentTestBaseUrl}/${existingComment.id}`)
        .send(updatedCommentData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.content).toBe(updatedCommentData.content);

      // Perform a PUT request to create a new Comment
      const createResponse = await agent
        .put(`${commentTestBaseUrl}/737472696e67206f72206964`)
        .send(updatedCommentData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.content).toBe(updatedCommentData.content);
    });

    it("should delete a comment DELETE", async () => {
      // Create an comment to delete
      const commentToDelete = await createComment({
        ...updatedCommentData,
        author: user.id,
      });
      const response = await agent
        .delete(`${commentTestBaseUrl}/${commentToDelete.id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Comment.findById(commentToDelete.id)).toBeNull();
    });
  });

  describe("Retrieve Single Comments", () => {
    it("should find a single comment by its ID GET:", async () => {
      // Create a test comment record in the database
      const testComment = await createComment({
        ...commentTestData,
        author: user.id,
      });

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

  describe("Delete Multiple Comments", () => {
    it("should delete multiple comments by their IDs DELETE:", async () => {
      // Create test data by inserting comment records into the database
      const comment1 = await createComment({
        ...commentData1,
        author: user.id,
      });
      const comment2 = await createComment({
        ...commentData2,
        author: user.id,
      });

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

  describe("Update Existing Comments", () => {
    it("should edit an existing comment PATCH", async () => {
      // Find an existing comment (assuming it exists)
      const commentToUpdate = await createComment({
        ...existingCommentData,
        author: user.id,
      });
      // If an comment with the specified name exists, update it
      const response = await agent
        .patch(`${commentTestBaseUrl}/${commentToUpdate.id}`)
        .send(updatedContent)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      // console.log(response);
      expect(response.statusCode).toBe(200);
      expect(response.body.data.content).toBe(updatedContent.content);
    });
  });
});
