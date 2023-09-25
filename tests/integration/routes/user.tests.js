// setup database test connection
require("../../setup/testSetup");
const { create: createUser } = require("../../../src/lib/user");
const {
  userData1,
  userData2,
  userTestData,
  createUserData,
  newUserData,
  updatedUserData,
  existingUserData,
  updatedDescription,
} = require("../../testSeed/user");
const agent = require("../../agent");
const { User, User } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const userTestBaseUrl = `${testBaseUrl}/users`;
const findUserByProperty = async (property, value) => {
  const user = await User.findOne({ [property]: value });
  return user;
};
describe("User API Integration Tests", () => {
  beforeEach(async () => {
    createUserData.forEach(async (user) => {
      await createUser({ ...user });
    });
    await createTestUser();
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await User.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new User", () => {
    it("should create a new user POST", async () => {
      const response = await agent
        .post(userTestBaseUrl)
        .send(newUserData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(newUserData.name);
      expect(response.body.data.username).toBe(newUserData.username);
      expect(response.body.data.email).toBe(newUserData.email);
    });
  });
  describe("Retrieve Multiple Users", () => {
    it("should retrieve a list of users GET:", async () => {
      const response = await agent.get(userTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Users", () => {
    it("should delete multiple users by their IDs DELETE:", async () => {
      // Create test data by inserting user records into the database
      const user1 = await createUser({ ...userData1 });
      const user2 = await createUser({ ...userData2 });

      // Retrieve the IDs of the created user records
      const userIdsToDelete = [user1.id, user2.id];
      // Delete multiple users by their IDs
      const response = await agent
        .delete(userTestBaseUrl)
        .send({ ids: userIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the users with the specified IDs no longer exist in the database
      for (const userId of userIdsToDelete) {
        const deletedUser = await User.findById(userId);
        expect(deletedUser).toBeNull();
      }
    });
  });
  describe("Retrieve Single Users", () => {
    it("should find a single user by its ID GET:", async () => {
      // Create a test user record in the database
      const testUser = await createUser({ ...userTestData });

      // Perform a GET request to find the user by its ID
      const response = await agent
        .get(`${userTestBaseUrl}/${testUser.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testUser
      expect(response.body.id).toBe(String(testUser.id));
      expect(response.body.data.name).toBe(testUser.name);
      expect(response.body.data.description).toBe(testUser.description);
    });
  });
  describe("Update and Delete Users", () => {
    it("should update a user by Id or create a new one if not found PUT", async () => {
      // Create a test user record in the database
      const existingUser = await createUser(existingUserData);

      // Perform a PUT request to update the user by name
      const response = await agent
        .put(`${userTestBaseUrl}/${existingUser.id}`)
        .send(updatedUserData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedUserData.name);
      expect(response.body.data.description).toBe(updatedUserData.description);

      // Verify that the user with the updated name and description exists in the database
      const updatedUserInDB = await findUserByProperty(
        "name",
        updatedUserData.name,
      );
      expect(updatedUserInDB).not.toBeNull();

      // Create data for a user that doesn't exist in the database
      // Perform a PUT request to create a new user
      const createResponse = await agent
        .put(`${userTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newUserData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(newUserData.name);
      expect(createResponse.body.data.description).toBe(
        newUserData.description,
      );

      // Verify that the new user exists in the database
      const newUserInDB = await findUserByProperty("name", newUserData.name);
      expect(newUserInDB).not.toBeNull();
    });
    it("should edit an existing user PATCH", async () => {
      // Find an existing user (assuming it exists)
      const userToUpdate = await findUserByProperty("name", "user name");

      // If a user with the specified name exists, update it
      const response = await agent
        .patch(`${userTestBaseUrl}/${userToUpdate._id}`)
        .send(updatedDescription)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.description).toBe(updatedUserData.description);
    });
    it("should delete a user DELETE", async () => {
      const userToDelete = await findUserByProperty("name", "user name");

      const response = await agent
        .delete(`${userTestBaseUrl}/${userToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await User.findById(userToDelete._id)).toBeNull();
    });
  });
});
