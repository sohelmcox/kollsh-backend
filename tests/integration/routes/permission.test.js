// setup database test connection
require("../../setup/testSetup");
const { create: createPermission } = require("../../../src/lib/permission");
const {
  permissionData1,
  permissionData2,
  permissionTestData,
  createPermissionData,
  newPermissionData,
  updatedPermissionData,
  existingPermissionData,
  updatedDescription,
  permissionsData,
  rolesData,
} = require("../../testSeed/permission");
const agent = require("../../agent");
const { Permission, User, Role } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const permissionTestBaseUrl = `${testBaseUrl}/permissions`;
const findPermissionByProperty = async (property, value) => {
  const permission = await Permission.findOne({ [property]: value });
  return permission;
};
describe("Permission API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial permissions
    await Promise.all(
      createPermissionData.map(async (permission) => {
        await createPermission({ ...permission, seller: user.id });
      }),
    );
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await Permission.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new Permission", () => {
    it("should create a new permission POST", async () => {
      const response = await agent
        .post(permissionTestBaseUrl)
        .send(newPermissionData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.description).toBe(
        newPermissionData.description,
      );
    });
  });
  describe("Retrieve Multiple Permissions", () => {
    it("should retrieve a list of permissions GET:", async () => {
      const response = await agent
        .get(permissionTestBaseUrl)
        .set("authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(3);
    });
  });
  describe("Delete Multiple Permissions", () => {
    it("should delete multiple permissions by their IDs DELETE:", async () => {
      // Create test data by inserting permission records into the database
      const permission1 = await createPermission({ ...permissionData1 });
      const permission2 = await createPermission({ ...permissionData2 });

      // Retrieve the IDs of the created permission records
      const permissionIdsToDelete = [permission1.id, permission2.id];
      // Delete multiple permissions by their IDs
      const response = await agent
        .delete(permissionTestBaseUrl)
        .send({ ids: permissionIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the permissions with the specified IDs no longer exist in the database
      for (const permissionId of permissionIdsToDelete) {
        const deletedPermission = await Permission.findById(permissionId);
        expect(deletedPermission).toBeNull();
      }
    });
  });
  describe("Retrieve Single Permissions", () => {
    it("should find a single permission by its ID GET:", async () => {
      // Create a test permission record in the database
      const testPermission = await createPermission({ ...permissionTestData });

      // Perform a GET request to find the permission by its ID
      const response = await agent
        .get(`${permissionTestBaseUrl}/${testPermission.id}`)
        .set("Accept", "application/json")
        .set("authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testPermission
      expect(response.body.id).toBe(String(testPermission.id));
      expect(response.body.data.description).toBe(testPermission.description);
    });
  });
  describe("Update and Delete Permissions", () => {
    it("should update a permission by Id or create a new one if not found PUT", async () => {
      // Create a test permission record in the database
      const existingPermission = await createPermission(existingPermissionData);

      // Perform a PUT request to update the permission by name
      const response = await agent
        .put(`${permissionTestBaseUrl}/${existingPermission.id}`)
        .send(updatedPermissionData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.description).toBe(
        updatedPermissionData.description,
      );

      // Verify that the permission with the updated name and description exists in the database
      const updatedPermissionInDB = await findPermissionByProperty(
        "description",
        updatedPermissionData.description,
      );
      expect(updatedPermissionInDB).not.toBeNull();

      // Create data for a permission that doesn't exist in the database
      // Perform a PUT request to create a new permission
      const createResponse = await agent
        .put(`${permissionTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newPermissionData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.description).toBe(
        newPermissionData.description,
      );

      // Verify that the new permission exists in the database
      const newPermissionInDB = await findPermissionByProperty(
        "description",
        newPermissionData.description,
      );
      expect(newPermissionInDB).not.toBeNull();
    });
    it("should edit an existing permission PATCH", async () => {
      // Find an existing permission (assuming it exists)
      const permissionToUpdate = await findPermissionByProperty(
        "description",
        "permission name",
      );

      // If a permission with the specified name exists, update it
      const response = await agent
        .patch(`${permissionTestBaseUrl}/${permissionToUpdate._id}`)
        .send(updatedDescription)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.description).toBe(
        updatedPermissionData.description,
      );
    });
    it("should delete a permission DELETE", async () => {
      const permissionToDelete = await findPermissionByProperty(
        "description",
        "permission name",
      );

      const response = await agent
        .delete(`${permissionTestBaseUrl}/${permissionToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Permission.findById(permissionToDelete._id)).toBeNull();
    });
  });
});
