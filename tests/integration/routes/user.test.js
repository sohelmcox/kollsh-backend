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
  toDeleteUser,
  toUpdateUser,
  toChangePassword,
} = require("../../testSeed/user");
const agent = require("../../agent");
const { User } = require("../../../src/models");
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
      const response = await agent
        .get(userTestBaseUrl)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(3);
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
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testUser
      expect(response.body.id).toBe(String(testUser.id));
      expect(response.body.data.name).toBe(testUser.name);
      expect(response.body.data.description).toBe(testUser.description);
    });
  });
  describe("Edit and Delete Users", () => {
    it("should edit an existing user PATCH", async () => {
      // Find an existing user (assuming it exists)
      const userToUpdate = await User.create(toUpdateUser);
      // If a user with the specified name exists, update it
      const response = await agent
        .patch(`${userTestBaseUrl}/${userToUpdate._id}`)
        .send(updatedDescription)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(200);
    });
    it("should delete a user DELETE", async () => {
      const userToDelete = await User.create(toDeleteUser);
      const response = await agent
        .delete(`${userTestBaseUrl}/${userToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await User.findById(userToDelete._id)).toBeNull();
    });
  });
  describe("GET /me", () => {
    it("should return the user's information when authenticated", async () => {
      // Perform a GET request to find the user by its ID
      const response = await agent
        .get(`${userTestBaseUrl}/me`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
    });
  });
  describe("POST /change-password", () => {
    it("should change the user's password when valid data is provided", async () => {
      const userToChange = await User.create(toChangePassword);

      const response = await agent
        .post(`${userTestBaseUrl}/change-password`)
        .send({
          id: userToChange.id,
          password: "new_password",
          passwordConfirmation: "new_password",
        })
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Password changed successfully.");
    });
  });
});
