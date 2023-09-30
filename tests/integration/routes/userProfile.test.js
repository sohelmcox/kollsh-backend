// setup database test connection
require("../../setup/testSetup");
const { create: createUserProfile } = require("../../../src/lib/userProfile");
const {
  userProfileData1,
  userProfileData2,
  userProfileTestData,
  createUserProfileData,
  newUserProfileData,
  updatedUserProfileData,
  existingUserProfileData,
  updatedLastName,
  permissionsData,
  rolesData,
} = require("../../testSeed/userProfile");
const agent = require("../../agent");
const { UserProfile, User, Permission, Role } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const userProfileTestBaseUrl = `${testBaseUrl}/user-profile`;
const findUserProfileByProperty = async (property, value) => {
  const userProfile = await UserProfile.findOne({ [property]: value });
  return userProfile;
};
describe("UserProfile API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial UserProfile
    await Promise.all(
      createUserProfileData.map(async (userProfile) => {
        await createUserProfile({ ...userProfile, user: user.id });
      }),
    );
  });
  afterEach(async () => {
    // Clean up test data after each test case
    await UserProfile.deleteMany({});
    await User.deleteMany({});
    await Permission.deleteMany({});
    await Role.deleteMany({});
  });
  describe("Create A new UserProfile", () => {
    it("should create a new userProfile POST", async () => {
      const response = await agent
        .post(userProfileTestBaseUrl)
        .send({ ...newUserProfileData, user: user.id })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.firstName).toBe(newUserProfileData.firstName);
      expect(response.body.data.lastName).toBe(newUserProfileData.lastName);
    });
  });
  describe("Retrieve Multiple UserProfiles", () => {
    it("should retrieve a list of userProfiles GET:", async () => {
      const response = await agent
        .get(userProfileTestBaseUrl)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple UserProfiles", () => {
    it("should delete multiple userProfiles by their IDs DELETE:", async () => {
      // Create test data by inserting userProfile records into the database
      const userProfile1 = await createUserProfile({
        ...userProfileData1,
        user: user.id,
      });
      const userProfile2 = await createUserProfile({
        ...userProfileData2,
        user: user.id,
      });

      // Retrieve the IDs of the created userProfile records
      const userProfileIdsToDelete = [userProfile1.id, userProfile2.id];
      // Delete multiple userProfiles by their IDs
      const response = await agent
        .delete(userProfileTestBaseUrl)
        .send({ ids: userProfileIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the userProfiles with the specified IDs no longer exist in the database
      for (const userProfileId of userProfileIdsToDelete) {
        const deletedUserProfile = await UserProfile.findById(userProfileId);
        expect(deletedUserProfile).toBeNull();
      }
    });
  });
  describe("Retrieve Single UserProfiles", () => {
    it("should find a single userProfile by its ID GET:", async () => {
      // Create a test userProfile record in the database
      const testUserProfile = await createUserProfile({
        ...userProfileTestData,
        user: user.id,
      });

      // Perform a GET request to find the userProfile by its ID
      const response = await agent
        .get(`${userProfileTestBaseUrl}/${testUserProfile.id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testUserProfile
      expect(response.body.id).toBe(String(testUserProfile.id));
      expect(response.body.data.firstName).toBe(testUserProfile.firstName);
      expect(response.body.data.lastName).toBe(testUserProfile.lastName);
    });
  });
  describe("Update and Delete UserProfiles", () => {
    it("should update a userProfile by Id or create a new one if not found PUT", async () => {
      // Create a test userProfile record in the database
      const existingUserProfile = await createUserProfile({
        ...existingUserProfileData,
        user: user.id,
      });

      // Perform a PUT request to update the userProfile by firstName
      const response = await agent
        .put(`${userProfileTestBaseUrl}/${existingUserProfile.id}`)
        .send(updatedUserProfileData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.firstName).toBe(
        updatedUserProfileData.firstName,
      );
      expect(response.body.data.lastName).toBe(updatedUserProfileData.lastName);

      // Verify that the userProfile with the updated firstName and lastName exists in the database
      const updatedUserProfileInDB = await findUserProfileByProperty(
        "firstName",
        updatedUserProfileData.firstName,
      );
      expect(updatedUserProfileInDB).not.toBeNull();

      // Create data for a userProfile that doesn't exist in the database
      // Perform a PUT request to create a new userProfile
      const createResponse = await agent
        .put(`${userProfileTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newUserProfileData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.firstName).toBe(
        newUserProfileData.firstName,
      );
      expect(createResponse.body.data.lastName).toBe(
        newUserProfileData.lastName,
      );

      // Verify that the new userProfile exists in the database
      const newUserProfileInDB = await findUserProfileByProperty(
        "firstName",
        newUserProfileData.firstName,
      );
      expect(newUserProfileInDB).not.toBeNull();
    });
    it("should edit an existing userProfile PATCH", async () => {
      // Find an existing userProfile (assuming it exists)
      const userProfileToUpdate = await findUserProfileByProperty(
        "firstName",
        "string",
      );

      // If a userProfile with the specified firstName exists, update it
      const response = await agent
        .patch(`${userProfileTestBaseUrl}/${userProfileToUpdate._id}`)
        .send(updatedLastName)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.lastName).toBe(updatedUserProfileData.lastName);
    });
    it("should delete a userProfile DELETE", async () => {
      const userProfileToDelete = await findUserProfileByProperty(
        "firstName",
        "userProfile name",
      );

      const response = await agent
        .delete(`${userProfileTestBaseUrl}/${userProfileToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(202);
      expect(await UserProfile.findById(userProfileToDelete._id)).toBeNull();
    });
  });
});
