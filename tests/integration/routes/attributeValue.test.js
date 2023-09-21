// setup database test connection
require("../../setup/testSetup");
const {
  create: createAttributeValue,
} = require("../../../src/lib/attributeValue");
const {
  attributeValueData1,
  attributeValueData2,
  attributeValueTestData,
  createAttributeValueData,
  newAttributeValueData,
  updatedAttributeValueData,
  existingAttributeValueData,
  updatedDescription,
  updatedColorCode,
} = require("../../testSeed/attributeValue");
const agent = require("../../agent");
const { AttributeValue, User } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const attributeValueTestBaseUrl = `${testBaseUrl}/attribute-values`;
const findAttributeValueByProperty = async (property, value) => {
  const attributeValue = await AttributeValue.findOne({ [property]: value });
  return attributeValue;
};
describe("AttributeValue API Integration Tests", () => {
  beforeEach(async () => {
    createAttributeValueData.forEach(async (attributeValue) => {
      await createAttributeValue({ ...attributeValue });
    });
    await createTestUser();
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await AttributeValue.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new AttributeValue", () => {
    it("should create a new attributeValue POST", async () => {
      const response = await agent
        .post(attributeValueTestBaseUrl)
        .send(newAttributeValueData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(newAttributeValueData.name);
      expect(response.body.data.color_code).toBe(
        newAttributeValueData.color_code,
      );
    });
  });
  describe("Retrieve Multiple AttributeValues", () => {
    it("should retrieve a list of attributeValues GET:", async () => {
      const response = await agent.get(attributeValueTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple AttributeValues", () => {
    it("should delete multiple attributeValues by their IDs DELETE:", async () => {
      // Create test data by inserting attributeValue records into the database
      const attributeValue1 = await createAttributeValue({
        ...attributeValueData1,
      });
      const attributeValue2 = await createAttributeValue({
        ...attributeValueData2,
      });

      // Retrieve the IDs of the created attributeValue records
      const attributeValueIdsToDelete = [
        attributeValue1.id,
        attributeValue2.id,
      ];
      // Delete multiple attributeValues by their IDs
      const response = await agent
        .delete(attributeValueTestBaseUrl)
        .send({ ids: attributeValueIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the attributeValues with the specified IDs no longer exist in the database
      for (const attributeValueId of attributeValueIdsToDelete) {
        const deletedAttributeValue = await AttributeValue.findById(
          attributeValueId,
        );
        expect(deletedAttributeValue).toBeNull();
      }
    });
  });
  describe("Retrieve Single AttributeValues", () => {
    it("should find a single attributeValue by its ID GET:", async () => {
      // Create a test attributeValue record in the database
      const testAttributeValue = await createAttributeValue({
        ...attributeValueTestData,
      });

      // Perform a GET request to find the attributeValue by its ID
      const response = await agent
        .get(`${attributeValueTestBaseUrl}/${testAttributeValue.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testAttributeValue
      expect(response.body.id).toBe(String(testAttributeValue.id));
      expect(response.body.data.name).toBe(testAttributeValue.name);
      expect(response.body.data.color_code).toBe(testAttributeValue.color_code);
    });
  });
  describe("Update and Delete AttributeValues", () => {
    it("should update a attributeValue by Id or create a new one if not found PUT", async () => {
      // Create a test attributeValue record in the database
      const existingAttributeValue = await createAttributeValue(
        existingAttributeValueData,
      );

      // Perform a PUT request to update the attributeValue by name
      const response = await agent
        .put(`${attributeValueTestBaseUrl}/${existingAttributeValue.id}`)
        .send(updatedAttributeValueData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedAttributeValueData.name);
      expect(response.body.data.color_code).toBe(
        updatedAttributeValueData.color_code,
      );

      // Verify that the attributeValue with the updated name and description exists in the database
      const updatedAttributeValueInDB = await findAttributeValueByProperty(
        "name",
        updatedAttributeValueData.name,
      );
      expect(updatedAttributeValueInDB).not.toBeNull();

      // Create data for a attributeValue that doesn't exist in the database
      // Perform a PUT request to create a new attributeValue
      const createResponse = await agent
        .put(`${attributeValueTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newAttributeValueData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(newAttributeValueData.name);
      expect(createResponse.body.data.color_code).toBe(
        newAttributeValueData.color_code,
      );

      // Verify that the new attributeValue exists in the database
      const newAttributeValueInDB = await findAttributeValueByProperty(
        "name",
        newAttributeValueData.name,
      );
      expect(newAttributeValueInDB).not.toBeNull();
    });
    it("should edit an existing attributeValue PATCH", async () => {
      // Find an existing attributeValue (assuming it exists)
      const attributeValueToUpdate = await findAttributeValueByProperty(
        "name",
        "attributeValue name",
      );

      // If a attributeValue with the specified name exists, update it
      const response = await agent
        .patch(`${attributeValueTestBaseUrl}/${attributeValueToUpdate._id}`)
        .send(updatedColorCode)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.color_code).toBe(
        updatedAttributeValueData.updatedColorCode,
      );
    });
    it("should delete a attributeValue DELETE", async () => {
      const attributeValueToDelete = await findAttributeValueByProperty(
        "name",
        "attributeValue name",
      );

      const response = await agent
        .delete(`${attributeValueTestBaseUrl}/${attributeValueToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(
        await AttributeValue.findById(attributeValueToDelete._id),
      ).toBeNull();
    });
  });
});
