// setup database test connection
require("../../setup/testSetup");
const { create: createBrand } = require("../../../src/lib/brand");
const {
  brandData1,
  brandData2,
  brandTestData,
  createBrandData,
  newBrandData,
  updatedBrandData,
  existingBrandData,
  updatedDescription,
  permissionsData,
  rolesData,
} = require("../../testSeed/brand");
const agent = require("../../agent");
const { Brand, User, Permission, Role } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const brandTestBaseUrl = `${testBaseUrl}/brands`;
const findBrandByProperty = async (property, value) => {
  const brand = await Brand.findOne({ [property]: value });
  return brand;
};
describe("Brand API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial brands
    await Promise.all(
      createBrandData.map(async (brand) => {
        await createBrand({ ...brand });
      }),
    );
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await Brand.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new Brand", () => {
    it("should create a new brand POST", async () => {
      const response = await agent
        .post(brandTestBaseUrl)
        .send(newBrandData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(newBrandData.name);
      expect(response.body.data.slug).toBe(newBrandData.slug);
      expect(response.body.data.description).toBe(newBrandData.description);
    });
  });
  describe("Retrieve Multiple Brands", () => {
    it("should retrieve a list of brands GET:", async () => {
      const response = await agent.get(brandTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Brands", () => {
    it("should delete multiple brands by their IDs DELETE:", async () => {
      // Create test data by inserting brand records into the database
      const brand1 = await createBrand({ ...brandData1 });
      const brand2 = await createBrand({ ...brandData2 });

      // Retrieve the IDs of the created brand records
      const brandIdsToDelete = [brand1.id, brand2.id];
      // Delete multiple brands by their IDs
      const response = await agent
        .delete(brandTestBaseUrl)
        .send({ ids: brandIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the brands with the specified IDs no longer exist in the database
      for (const brandId of brandIdsToDelete) {
        const deletedBrand = await Brand.findById(brandId);
        expect(deletedBrand).toBeNull();
      }
    });
  });
  describe("Retrieve Single Brands", () => {
    it("should find a single brand by its ID GET:", async () => {
      // Create a test brand record in the database
      const testBrand = await createBrand({ ...brandTestData });

      // Perform a GET request to find the brand by its ID
      const response = await agent
        .get(`${brandTestBaseUrl}/${testBrand.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testBrand
      expect(response.body.id).toBe(String(testBrand.id));
      expect(response.body.data.name).toBe(testBrand.name);
      expect(response.body.data.description).toBe(testBrand.description);
    });
  });
  describe("Update and Delete Brands", () => {
    it("should update a brand by Id or create a new one if not found PUT", async () => {
      // Create a test brand record in the database
      const existingBrand = await createBrand(existingBrandData);

      // Perform a PUT request to update the brand by name
      const response = await agent
        .put(`${brandTestBaseUrl}/${existingBrand.id}`)
        .send(updatedBrandData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedBrandData.name);
      expect(response.body.data.description).toBe(updatedBrandData.description);

      // Verify that the brand with the updated name and description exists in the database
      const updatedBrandInDB = await findBrandByProperty(
        "name",
        updatedBrandData.name,
      );
      expect(updatedBrandInDB).not.toBeNull();

      // Create data for a brand that doesn't exist in the database
      // Perform a PUT request to create a new brand
      const createResponse = await agent
        .put(`${brandTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newBrandData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(newBrandData.name);
      expect(createResponse.body.data.description).toBe(
        newBrandData.description,
      );

      // Verify that the new brand exists in the database
      const newBrandInDB = await findBrandByProperty("name", newBrandData.name);
      expect(newBrandInDB).not.toBeNull();
    });
    it("should edit an existing brand PATCH", async () => {
      // Find an existing brand (assuming it exists)
      const brandToUpdate = await findBrandByProperty("name", "brand name");

      // If a brand with the specified name exists, update it
      const response = await agent
        .patch(`${brandTestBaseUrl}/${brandToUpdate._id}`)
        .send(updatedDescription)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.description).toBe(updatedBrandData.description);
    });
    it("should delete a brand DELETE", async () => {
      const brandToDelete = await findBrandByProperty("name", "brand name");

      const response = await agent
        .delete(`${brandTestBaseUrl}/${brandToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Brand.findById(brandToDelete._id)).toBeNull();
    });
  });
});
