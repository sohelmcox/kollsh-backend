// setup database test connection
require("../../setup/testSetup");
const { create: createItem } = require("../../../src/lib/item");
const {
  itemData1,
  itemData2,
  itemTestData,
  createItemData,
  newItemData,
  updatedItemData,
  existingItemData,
  updatedDescription,
  updatedNegotiable,
} = require("../../testSeed/item");
const agent = require("../../agent");
const { Item, User } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const itemTestBaseUrl = `${testBaseUrl}/items`;
const findItemByProperty = async (property, value) => {
  const item = await Item.findOne({ [property]: value });
  return item;
};
describe("Item API Integration Tests", () => {
  beforeEach(async () => {
    createItemData.forEach(async (item) => {
      await createItem({ ...item });
    });
    await createTestUser();
  });
  afterEach(async () => {
    // Clean up test data after each test case
    await Item.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new Item", () => {
    it("should create a new item POST", async () => {
      const response = await agent
        .post(itemTestBaseUrl)
        .send(newItemData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(newItemData.name);
      expect(response.body.data.slug).toBe(newItemData.slug);
      expect(response.body.data.negotiable).toBe(newItemData.negotiable);
    });
  });
  describe("Retrieve Multiple Items", () => {
    it("should retrieve a list of items GET:", async () => {
      const response = await agent.get(itemTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Items", () => {
    it("should delete multiple items by their IDs DELETE:", async () => {
      // Create test data by inserting item records into the database
      const item1 = await createItem({ ...itemData1 });
      const item2 = await createItem({ ...itemData2 });

      // Retrieve the IDs of the created item records
      const itemIdsToDelete = [item1.id, item2.id];
      // Delete multiple items by their IDs
      const response = await agent
        .delete(itemTestBaseUrl)
        .send({ ids: itemIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(202);

      // Verify that the items with the specified IDs no longer exist in the database
      for (const itemId of itemIdsToDelete) {
        const deletedItem = await Item.findById(itemId);
        expect(deletedItem).toBeNull();
      }
    });
  });
  describe("Retrieve Single Items", () => {
    it("should find a single item by its ID GET:", async () => {
      // Create a test item record in the database
      const testItem = await createItem({ ...itemTestData });

      // Perform a GET request to find the item by its ID
      const response = await agent
        .get(`${itemTestBaseUrl}/${testItem.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);
      // Check if the response matches the testItem
      expect(response.body.id).toBe(String(testItem.id));
      expect(response.body.data.name).toBe(testItem.data.name);
      expect(response.body.data.negotiable).toBe(testItem.data.negotiable);
    });
  });
  describe("Update and Delete Items", () => {
    it("should update a item by Id or create a new one if not found PUT", async () => {
      // Create a test item record in the database
      const existingItem = await createItem(existingItemData);
      // Perform a PUT request to update the item by name
      const response = await agent
        .put(`${itemTestBaseUrl}/${existingItem.id}`)
        .send(updatedItemData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      // console.log(response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedItemData.name);
      expect(response.body.data.negotiable).toBe(updatedItemData.negotiable);

      // Verify that the item with the updated name and description exists in the database
      const updatedItemInDB = await findItemByProperty(
        "name",
        updatedItemData.name,
      );
      expect(updatedItemInDB).not.toBeNull();

      // Create data for a item that doesn't exist in the database
      // Perform a PUT request to create a new item
      const createResponse = await agent
        .put(`${itemTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newItemData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(newItemData.name);
      expect(createResponse.body.data.negotiable).toBe(newItemData.negotiable);

      // Verify that the new item exists in the database
      const newItemInDB = await findItemByProperty("name", newItemData.name);
      expect(newItemInDB).not.toBeNull();
    });
    it("should edit an existing item PATCH", async () => {
      // Find an existing item (assuming it exists)
      const itemToUpdate = await findItemByProperty("name", "item name");

      // If a item with the specified name exists, update it
      const response = await agent
        .patch(`${itemTestBaseUrl}/${itemToUpdate._id}`)
        .send(updatedNegotiable)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.negotiable).toBe(updatedNegotiable.negotiable);
    });
    it("should delete a item DELETE", async () => {
      const itemToDelete = await findItemByProperty("name", "item name");

      const response = await agent
        .delete(`${itemTestBaseUrl}/${itemToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Item.findById(itemToDelete._id)).toBeNull();
    });
  });
});
