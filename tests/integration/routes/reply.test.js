// setup database test connection
require("../../setup/testSetup");
const { create: createReply } = require("../../../src/lib/reply");
const {
  replyData1,
  replyData2,
  replyTestData,
  createReplyData,
  newReplyData,
  updatedReplyData,
  existingReplyData,
  updatedContent,
} = require("../../testSeed/reply");
const agent = require("../../agent");
const { Reply, User } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const replyTestBaseUrl = `${testBaseUrl}/replies`;
const findReplyByProperty = async (property, value) => {
  const reply = await Reply.findOne({ [property]: value });
  return reply;
};
describe("Reply API Integration Tests", () => {
  beforeEach(async () => {
    createReplyData.forEach(async (reply) => {
      await createReply({ ...reply });
    });
    await createTestUser();
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await Reply.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new Reply", () => {
    it("should create a new reply POST", async () => {
      const response = await agent
        .post(replyTestBaseUrl)
        .send(newReplyData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.content).toBe(newReplyData.content);
    });
  });
  describe("Retrieve Multiple Replies", () => {
    it("should retrieve a list of replies GET:", async () => {
      const response = await agent.get(replyTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Replies", () => {
    it("should delete multiple replies by their IDs DELETE:", async () => {
      // Create test data by inserting reply records into the database
      const reply1 = await createReply({ ...replyData1 });
      const reply2 = await createReply({ ...replyData2 });

      // Retrieve the IDs of the created reply records
      const replyIdsToDelete = [reply1.id, reply2.id];
      // Delete multiple replies by their IDs
      const response = await agent
        .delete(replyTestBaseUrl)
        .send({ ids: replyIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the replies with the specified IDs no longer exist in the database
      for (const replyId of replyIdsToDelete) {
        const deletedReply = await Reply.findById(replyId);
        expect(deletedReply).toBeNull();
      }
    });
  });
  describe("Retrieve Single Replies", () => {
    it("should find a single reply by its ID GET:", async () => {
      // Create a test reply record in the database
      const testReply = await createReply({ ...replyTestData });

      // Perform a GET request to find the reply by its ID
      const response = await agent
        .get(`${replyTestBaseUrl}/${testReply.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testReply
      expect(response.body.id).toBe(String(testReply.id));
      expect(response.body.data.content).toBe(testReply.content);
    });
  });
  describe("Update and Delete Replies", () => {
    it("should edit an existing reply PATCH", async () => {
      // Find an existing reply (assuming it exists)
      const replyToUpdate = await findReplyByProperty("content", "reply name");

      // If a reply with the specified content exists, update it
      const response = await agent
        .patch(`${replyTestBaseUrl}/${replyToUpdate._id}`)
        .send(updatedContent)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.content).toBe(updatedReplyData.content);
    });
    it("should delete a reply DELETE", async () => {
      const replyToDelete = await findReplyByProperty("content", "reply name");

      const response = await agent
        .delete(`${replyTestBaseUrl}/${replyToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Reply.findById(replyToDelete._id)).toBeNull();
    });
  });
});
