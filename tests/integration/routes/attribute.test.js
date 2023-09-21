// setup database test connection
require("../../setup/testSetup");
const { create: createAttribute } = require("../../../src/lib/attribute");
const {
  attributeData1,
  attributeData2,
  attributeTestData,
  createAttributeData,
  newAttributeData,
  updatedAttributeData,
  existingAttributeData,
  updatedDescription,
} = require("../../testSeed/attribute");
const agent = require("../../agent");
const { Attribute, User } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const attributeTestBaseUrl = `${testBaseUrl}/attributes`;
const findAttributeByProperty = async (property, value) => {
  const attribute = await Attribute.findOne({ [property]: value });
  return attribute;
};
describe("Attribute API Integration Tests", () => {
  beforeEach(async () => {
    createAttributeData.forEach(async (attribute) => {
      await createAttribute({ ...attribute });
    });
    await createTestUser();
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await Attribute.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new Attribute", () => {
    it("should create a new attribute POST", async () => {
      const response = await agent
        .post(attributeTestBaseUrl)
        .send(newAttributeData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(newAttributeData.name);
      expect(response.body.data.slug).toBe(newAttributeData.slug);
      expect(response.body.data.description).toBe(newAttributeData.description);
    });
  });
  describe("Retrieve Multiple Attributes", () => {
    it("should retrieve a list of attributes GET:", async () => {
      const response = await agent.get(attributeTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Attributes", () => {
    it("should delete multiple attributes by their IDs DELETE:", async () => {
      // Create test data by inserting attribute records into the database
      const attribute1 = await createAttribute({ ...attributeData1 });
      const attribute2 = await createAttribute({ ...attributeData2 });

      // Retrieve the IDs of the created attribute records
      const attributeIdsToDelete = [attribute1.id, attribute2.id];
      // Delete multiple attributes by their IDs
      const response = await agent
        .delete(attributeTestBaseUrl)
        .send({ ids: attributeIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the attributes with the specified IDs no longer exist in the database
      for (const attributeId of attributeIdsToDelete) {
        const deletedAttribute = await Attribute.findById(attributeId);
        expect(deletedAttribute).toBeNull();
      }
    });
  });
  describe("Retrieve Single Attributes", () => {
    it("should find a single attribute by its ID GET:", async () => {
      // Create a test attribute record in the database
      const testAttribute = await createAttribute({ ...attributeTestData });

      // Perform a GET request to find the attribute by its ID
      const response = await agent
        .get(`${attributeTestBaseUrl}/${testAttribute.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testAttribute
      expect(response.body.id).toBe(String(testAttribute.id));
      expect(response.body.data.name).toBe(testAttribute.name);
      expect(response.body.data.description).toBe(testAttribute.description);
    });
  });
  describe("Update and Delete Attributes", () => {
    it("should update a attribute by Id or create a new one if not found PUT", async () => {
      // Create a test attribute record in the database
      const existingAttribute = await createAttribute(existingAttributeData);

      // Perform a PUT request to update the attribute by name
      const response = await agent
        .put(`${attributeTestBaseUrl}/${existingAttribute._id}`)
        .send(updatedAttributeData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedAttributeData.name);
      expect(response.body.data.description).toBe(
        updatedAttributeData.description,
      );

      // Verify that the attribute with the updated name and description exists in the database
      const updatedAttributeInDB = await findAttributeByProperty(
        "name",
        updatedAttributeData.name,
      );
      expect(updatedAttributeInDB).not.toBeNull();

      // Create data for a attribute that doesn't exist in the database
      // Perform a PUT request to create a new attribute
      const createResponse = await agent
        .put(`${attributeTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newAttributeData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(newAttributeData.name);
      expect(createResponse.body.data.description).toBe(
        newAttributeData.description,
      );

      // Verify that the new attribute exists in the database
      const newAttributeInDB = await findAttributeByProperty(
        "name",
        newAttributeData.name,
      );
      expect(newAttributeInDB).not.toBeNull();
    });
    it("should edit an existing attribute PATCH", async () => {
      // Find an existing attribute (assuming it exists)
      const attributeToUpdate = await findAttributeByProperty(
        "name",
        "attribute name new",
      );

      // If a attribute with the specified name exists, update it
      const response = await agent
        .patch(`${attributeTestBaseUrl}/${attributeToUpdate._id}`)
        .send(updatedDescription)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.description).toBe(
        updatedAttributeData.description,
      );
    });
    it("should delete a attribute DELETE", async () => {
      const attributeToDelete = await findAttributeByProperty(
        "name",
        "attribute name new",
      );

      const response = await agent
        .delete(`${attributeTestBaseUrl}/${attributeToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Attribute.findById(attributeToDelete._id)).toBeNull();
    });
  });
});
