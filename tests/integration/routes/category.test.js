// setup database test connection
require("../../setup/testSetup");
const { create: createCategory } = require("../../../src/lib/category");
const {
  categoryData1,
  categoryData2,
  categoryTestData,
  createCategoryData,
  newCategoryData,
  updatedCategoryData,
  existingCategoryData,
  updatedDescription,
  updatedName,
  permissionsData,
  rolesData,
} = require("../../testSeed/category");
const agent = require("../../agent");
const { Category, User, Role, Permission } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const categoryTestBaseUrl = `${testBaseUrl}/categories`;
const findCategoryByProperty = async (property, value) => {
  const category = await Category.findOne({ [property]: value });
  return category;
};
describe("Category API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial categories
    await Promise.all(
      createCategoryData.map(async (category) => {
        await createCategory({ ...category });
      }),
    );
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await Category.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new Category", () => {
    it("should create a new category POST", async () => {
      const response = await agent
        .post(categoryTestBaseUrl)
        .send(newCategoryData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(newCategoryData.name);
      expect(response.body.data.slug).toBe(newCategoryData.slug);
      expect(response.body.data.featured).toBe(newCategoryData.featured);
      expect(response.body.data.priority).toBe(newCategoryData.priority);
    });
  });
  describe("Retrieve Multiple Categories", () => {
    it("should retrieve a list of categories GET:", async () => {
      const response = await agent.get(categoryTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Categories", () => {
    it("should delete multiple categories by their IDs DELETE:", async () => {
      // Create test data by inserting category records into the database
      const category1 = await createCategory({ ...categoryData1 });
      const category2 = await createCategory({ ...categoryData2 });

      // Retrieve the IDs of the created category records
      const categoryIdsToDelete = [category1.id, category2.id];
      // Delete multiple categories by their IDs
      const response = await agent
        .delete(categoryTestBaseUrl)
        .send({ ids: categoryIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the categories with the specified IDs no longer exist in the database
      for (const categoryId of categoryIdsToDelete) {
        const deletedCategory = await Category.findById(categoryId);
        expect(deletedCategory).toBeNull();
      }
    });
  });
  describe("Retrieve Single Categories", () => {
    it("should find a single category by its ID GET:", async () => {
      // Create a test category record in the database
      const testCategory = await createCategory({ ...categoryTestData });

      // Perform a GET request to find the category by its ID
      const response = await agent
        .get(`${categoryTestBaseUrl}/${testCategory.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testCategory
      expect(response.body.id).toBe(String(testCategory.id));
      expect(response.body.data.name).toBe(testCategory.name);
      expect(response.body.data.featured).toBe(testCategory.featured);
      expect(response.body.data.priority).toBe(testCategory.priority);
    });
  });
  describe("Update and Delete Categories", () => {
    it("should update a category by Id or create a new one if not found PUT", async () => {
      // Create a test category record in the database
      const existingCategory = await createCategory(existingCategoryData);

      // Perform a PUT request to update the category by name
      const response = await agent
        .put(`${categoryTestBaseUrl}/${existingCategory.id}`)
        .send(updatedCategoryData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedCategoryData.name);
      expect(response.body.data.featured).toBe(updatedCategoryData.featured);
      expect(response.body.data.priority).toBe(updatedCategoryData.priority);

      // Verify that the category with the updated name and description exists in the database
      const updatedCategoryInDB = await findCategoryByProperty(
        "name",
        updatedCategoryData.name,
      );
      expect(updatedCategoryInDB).not.toBeNull();

      // Create data for a category that doesn't exist in the database
      // Perform a PUT request to create a new category
      const createResponse = await agent
        .put(`${categoryTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newCategoryData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(newCategoryData.name);
      expect(createResponse.body.data.featured).toBe(newCategoryData.featured);

      // Verify that the new category exists in the database
      const newCategoryInDB = await findCategoryByProperty(
        "name",
        newCategoryData.name,
      );
      expect(newCategoryInDB).not.toBeNull();
    });
    it("should edit an existing category PATCH", async () => {
      // Find an existing category (assuming it exists)
      const categoryToUpdate = await findCategoryByProperty("name", "string");

      // If a category with the specified name exists, update it
      const response = await agent
        .patch(`${categoryTestBaseUrl}/${categoryToUpdate._id}`)
        .send(updatedName)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedCategoryData.name);
    });
    it("should delete a category DELETE", async () => {
      const categoryToDelete = await findCategoryByProperty(
        "name",
        "category name",
      );

      const response = await agent
        .delete(`${categoryTestBaseUrl}/${categoryToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Category.findById(categoryToDelete._id)).toBeNull();
    });
  });
});
