// setup database test connection
require("../../setup/testSetup");
const { create: createRole } = require("../../../src/lib/role");
const {
  roleData1,
  roleData2,
  roleTestData,
  createRoleData,
  newRoleData,
  updatedRoleData,
  existingRoleData,
  updatedDescription,
  permissionsData,
  rolesData,
} = require("../../testSeed/role");
const agent = require("../../agent");
const { Role, User, Permission } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const roleTestBaseUrl = `${testBaseUrl}/roles`;
const findRoleByProperty = async (property, value) => {
  const role = await Role.findOne({ [property]: value });
  return role;
};
describe("Role API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial Role
    await Promise.all(
      createRoleData.map(async (role) => {
        await createRole({ ...role, createdBy: user.id });
      }),
    );
  });
  afterEach(async () => {
    // Clean up test data after each test case
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new Role", () => {
    it("should create a new role POST", async () => {
      const response = await agent
        .post(roleTestBaseUrl)
        .send(newRoleData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(newRoleData.name);
      expect(response.body.data.description).toBe(newRoleData.description);
    });
  });
  describe("Retrieve Multiple Roles", () => {
    it("should retrieve a list of roles GET:", async () => {
      const response = await agent
        .get(roleTestBaseUrl)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(3);
    });
  });
  describe("Delete Multiple Roles", () => {
    it("should delete multiple roles by their IDs DELETE:", async () => {
      // Create test data by inserting role records into the database
      const role1 = await createRole({ ...roleData1 });
      const role2 = await createRole({ ...roleData2 });

      // Retrieve the IDs of the created role records
      const roleIdsToDelete = [role1.id, role2.id];
      // Delete multiple roles by their IDs
      const response = await agent
        .delete(roleTestBaseUrl)
        .send({ ids: roleIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the roles with the specified IDs no longer exist in the database
      for (const roleId of roleIdsToDelete) {
        const deletedRole = await Role.findById(roleId);
        expect(deletedRole).toBeNull();
      }
    });
  });
  describe("Retrieve Single Roles", () => {
    it("should find a single role by its ID GET:", async () => {
      // Create a test role record in the database
      const testRole = await createRole({ ...roleTestData });

      // Perform a GET request to find the role by its ID
      const response = await agent
        .get(`${roleTestBaseUrl}/${testRole.id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testRole
      expect(response.body.id).toBe(String(testRole.id));
      expect(response.body.data.name).toBe(testRole.name);
      expect(response.body.data.description).toBe(testRole.description);
    });
  });
  describe("Update and Delete Roles", () => {
    it("should update a role by Id or create a new one if not found PUT", async () => {
      // Create a test role record in the database
      const existingRole = await createRole(existingRoleData);

      // Perform a PUT request to update the role by name
      const response = await agent
        .put(`${roleTestBaseUrl}/${existingRole.id}`)
        .send(updatedRoleData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedRoleData.name);
      expect(response.body.data.description).toBe(updatedRoleData.description);

      // Verify that the role with the updated name and description exists in the database
      const updatedRoleInDB = await findRoleByProperty(
        "name",
        updatedRoleData.name,
      );
      expect(updatedRoleInDB).not.toBeNull();

      // Create data for a role that doesn't exist in the database
      // Perform a PUT request to create a new role
      const createResponse = await agent
        .put(`${roleTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newRoleData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(newRoleData.name);
      expect(createResponse.body.data.description).toBe(
        newRoleData.description,
      );

      // Verify that the new role exists in the database
      const newRoleInDB = await findRoleByProperty("name", newRoleData.name);
      expect(newRoleInDB).not.toBeNull();
    });
    it("should edit an existing role PATCH", async () => {
      // Find an existing role (assuming it exists)
      const roleToUpdate = await findRoleByProperty("name", "role name");

      // If a role with the specified name exists, update it
      const response = await agent
        .patch(`${roleTestBaseUrl}/${roleToUpdate._id}`)
        .send(updatedDescription)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.description).toBe(updatedRoleData.description);
    });
    it("should delete a role DELETE", async () => {
      const roleToDelete = await findRoleByProperty("name", "role name");

      const response = await agent
        .delete(`${roleTestBaseUrl}/${roleToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Role.findById(roleToDelete._id)).toBeNull();
    });
  });
});
