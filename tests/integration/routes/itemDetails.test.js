// setup database test connection
require("../../setup/testSetup");
const { create: createItemDetails } = require("../../../src/lib/itemDetails");
const {
  itemDetailsData1,
  itemDetailsData2,
  itemDetailsTestData,
  createItemDetailsData,
  newItemDetailsData,
  updatedItemDetailsData,
  existingItemDetailsData,
  updatedDescription,
} = require("../../testSeed/itemDetails");
const agent = require("../../agent");
const { ItemDetails, User } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const itemDetailsTestBaseUrl = `${testBaseUrl}/item-details`;
const findItemDetailsByProperty = async (property, value) => {
  const itemDetails = await ItemDetails.findOne({ [property]: value });
  return itemDetails;
};
describe("ItemDetails API Integration Tests", () => {
  beforeEach(async () => {
    createItemDetailsData.forEach(async (itemDetails) => {
      await createItemDetails({ ...itemDetails });
    });
    await createTestUser();
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await ItemDetails.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new ItemDetails", () => {
    it("should create a new itemDetails POST", async () => {
      const response = await agent
        .post(itemDetailsTestBaseUrl)
        .send(newItemDetailsData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.description).toBe(
        newItemDetailsData.description,
      );
      expect(response.body.data.email).toBe(newItemDetailsData.email);
      expect(response.body.data.address).toBe(newItemDetailsData.address);
    });
  });
  describe("Retrieve Multiple ItemDetails", () => {
    it("should retrieve a list of itemDetails GET:", async () => {
      const response = await agent.get(itemDetailsTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });

  describe("Retrieve Single ItemDetails", () => {
    it("should find a single itemDetails by its ID GET:", async () => {
      // Create a test itemDetails record in the database
      const testItemDetails = await createItemDetails({
        ...itemDetailsTestData,
      });

      // Perform a GET request to find the itemDetails by its ID
      const response = await agent
        .get(`${itemDetailsTestBaseUrl}/${testItemDetails.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testItemDetails
      expect(response.body.id).toBe(String(testItemDetails.id));
      expect(response.body.data.email).toBe(testItemDetails.email);
      expect(response.body.data.description).toBe(testItemDetails.description);
    });
  });
  describe("Update and Delete ItemDetails", () => {
    it("should update a itemDetails by Id or create a new one if not found PUT", async () => {
      // Create a test itemDetails record in the database
      const existingItemDetails = await createItemDetails(
        existingItemDetailsData,
      );

      // Perform a PUT request to update the itemDetails by description
      const response = await agent
        .put(`${itemDetailsTestBaseUrl}/${existingItemDetails.id}`)
        .send(updatedItemDetailsData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.email).toBe(updatedItemDetailsData.email);
      expect(response.body.data.description).toBe(
        updatedItemDetailsData.description,
      );

      // Verify that the itemDetails with the updated description and description exists in the database
      const updatedItemDetailsInDB = await findItemDetailsByProperty(
        "description",
        updatedItemDetailsData.description,
      );
      expect(updatedItemDetailsInDB).not.toBeNull();

      // Create data for a itemDetails that doesn't exist in the database
      // Perform a PUT request to create a new itemDetails
      const createResponse = await agent
        .put(`${itemDetailsTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newItemDetailsData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.email).toBe(newItemDetailsData.email);
      expect(createResponse.body.data.description).toBe(
        newItemDetailsData.description,
      );

      // Verify that the new itemDetails exists in the database
      const newItemDetailsInDB = await findItemDetailsByProperty(
        "description",
        newItemDetailsData.description,
      );
      expect(newItemDetailsInDB).not.toBeNull();
    });
    it("should edit an existing itemDetails PATCH", async () => {
      // Find an existing itemDetails (assuming it exists)
      const itemDetailsToUpdate = await findItemDetailsByProperty(
        "description",
        "itemDetails name",
      );

      // If a itemDetails with the specified Description exists, update it
      const response = await agent
        .patch(`${itemDetailsTestBaseUrl}/${itemDetailsToUpdate._id}`)
        .send(updatedDescription)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.description).toBe(
        updatedItemDetailsData.description,
      );
    });
    it("should delete a itemDetails DELETE", async () => {
      const itemDetailsToDelete = await findItemDetailsByProperty(
        "description",
        "itemDetails name",
      );

      const response = await agent
        .delete(`${itemDetailsTestBaseUrl}/${itemDetailsToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await ItemDetails.findById(itemDetailsToDelete._id)).toBeNull();
    });
  });
});
