// setup database test connection
require("../../setup/testSetup");
const { create: createSubcategory } = require("../../../src/lib/subcategory");
const {
  subcategoryData1,
  subcategoryData2,
  subcategoryTestData,
  createSubcategoryData,
  newSubcategoryData,
  updatedSubcategoryData,
  existingSubcategoryData,
  updatedPriority,
  permissionsData,
  rolesData,
} = require("../../testSeed/subcategory");
const agent = require("../../agent");
const { Subcategory, User, Permission, Role } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const subcategoryTestBaseUrl = `${testBaseUrl}/subcategories`;
const findSubcategoryByProperty = async (property, value) => {
  const subcategory = await Subcategory.findOne({ [property]: value });
  return subcategory;
};
describe("Subcategory API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial Subcategory
    await Promise.all(
      createSubcategoryData.map(async (subcategory) => {
        await createSubcategory({ ...subcategory });
      }),
    );
  });
  afterEach(async () => {
    // Clean up test data after each test case
    await Subcategory.deleteMany({});
    await Permission.deleteMany({});
    await Role.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new Subcategory", () => {
    it("should create a new subcategory POST", async () => {
      const response = await agent
        .post(subcategoryTestBaseUrl)
        .send(newSubcategoryData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(newSubcategoryData.name);
      expect(response.body.data.slug).toBe(newSubcategoryData.slug);
    });
  });
  describe("Retrieve Multiple Subcategories", () => {
    it("should retrieve a list of subcategories GET:", async () => {
      const response = await agent.get(subcategoryTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Subcategories", () => {
    it("should delete multiple subcategories by their IDs DELETE:", async () => {
      // Create test data by inserting subcategory records into the database
      const subcategory1 = await createSubcategory({ ...subcategoryData1 });
      const subcategory2 = await createSubcategory({ ...subcategoryData2 });

      // Retrieve the IDs of the created subcategory records
      const subcategoryIdsToDelete = [subcategory1.id, subcategory2.id];
      // Delete multiple subcategories by their IDs
      const response = await agent
        .delete(subcategoryTestBaseUrl)
        .send({ ids: subcategoryIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the subcategories with the specified IDs no longer exist in the database
      for (const subcategoryId of subcategoryIdsToDelete) {
        const deletedSubcategory = await Subcategory.findById(subcategoryId);
        expect(deletedSubcategory).toBeNull();
      }
    });
  });
  describe("Retrieve Single Subcategories", () => {
    it("should find a single subcategory by its ID GET:", async () => {
      // Create a test subcategory record in the database
      const testSubcategory = await createSubcategory({
        ...subcategoryTestData,
      });

      // Perform a GET request to find the subcategory by its ID
      const response = await agent
        .get(`${subcategoryTestBaseUrl}/${testSubcategory.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testSubcategory
      expect(response.body.id).toBe(String(testSubcategory.id));
      expect(response.body.data.name).toBe(testSubcategory.name);
    });
  });
  describe("Update and Delete Subcategories", () => {
    it("should update a subcategory by Id or create a new one if not found PUT", async () => {
      // Create a test subcategory record in the database
      const existingSubcategory = await createSubcategory(
        existingSubcategoryData,
      );

      // Perform a PUT request to update the subcategory by name
      const response = await agent
        .put(`${subcategoryTestBaseUrl}/${existingSubcategory.id}`)
        .send(updatedSubcategoryData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedSubcategoryData.name);

      // Verify that the subcategory with the updated name and description exists in the database
      const updatedSubcategoryInDB = await findSubcategoryByProperty(
        "name",
        updatedSubcategoryData.name,
      );
      expect(updatedSubcategoryInDB).not.toBeNull();

      // Create data for a subcategory that doesn't exist in the database
      // Perform a PUT request to create a new subcategory
      const createResponse = await agent
        .put(`${subcategoryTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newSubcategoryData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(newSubcategoryData.name);

      // Verify that the new subcategory exists in the database
      const newSubcategoryInDB = await findSubcategoryByProperty(
        "name",
        newSubcategoryData.name,
      );
      expect(newSubcategoryInDB).not.toBeNull();
    });
    it("should edit an existing subcategory PATCH", async () => {
      // Find an existing subcategory (assuming it exists)
      const subcategoryToUpdate = await findSubcategoryByProperty(
        "name",
        "subcategory name",
      );

      // If a subcategory with the specified name exists, update it
      const response = await agent
        .patch(`${subcategoryTestBaseUrl}/${subcategoryToUpdate.id}`)
        .send(updatedPriority)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.priority).toBe(updatedSubcategoryData.priority);
    });
    it("should delete a subcategory DELETE", async () => {
      const subcategoryToDelete = await findSubcategoryByProperty(
        "name",
        "string",
      );

      const response = await agent
        .delete(`${subcategoryTestBaseUrl}/${subcategoryToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Subcategory.findById(subcategoryToDelete._id)).toBeNull();
    });
  });
});
