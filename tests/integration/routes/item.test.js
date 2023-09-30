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
  updatedNegotiable,
  permissionsData,
  rolesData,
} = require("../../testSeed/item");
const agent = require("../../agent");
const { Item, User, Role, Permission } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const itemTestBaseUrl = `${testBaseUrl}/items`;

describe("Item API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial items
    await Promise.all(
      createItemData.map(async (item) => {
        await createItem({ ...item, seller: user.id });
      }),
    );
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await Item.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await User.deleteMany({});
  });

  describe("Create, Retrieve, Update, and Delete Items", () => {
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

    it("should retrieve a list of items GET", async () => {
      const response = await agent.get(itemTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });

    it("should update a item by Id or create a new one if not found PUT", async () => {
      // Find an existing item (assuming it exists)
      const existingItem = await createItem({
        ...existingItemData,
        seller: user.id,
      });

      // Perform a PUT request to update the item by name
      const response = await agent
        .put(`${itemTestBaseUrl}/${existingItem.id}`)
        .send(updatedItemData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedItemData.name);
      expect(response.body.data.negotiable).toBe(updatedItemData.negotiable);

      // Perform a PUT request to create a new Item
      const createResponse = await agent
        .put(`${itemTestBaseUrl}/737472696e67206f72206964`)
        .send(updatedItemData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(updatedItemData.name);
      expect(createResponse.body.data.negotiable).toBe(
        updatedItemData.negotiable,
      );
    });

    it("should delete a item DELETE", async () => {
      // Create an item to delete
      const itemToDelete = await createItem({
        ...updatedItemData,
        seller: user.id,
      });

      const response = await agent
        .delete(`${itemTestBaseUrl}/${itemToDelete.id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Item.findById(itemToDelete.id)).toBeNull();
    });
  });

  describe("Retrieve Single Items", () => {
    it("should find a single item by its ID GET:", async () => {
      // Create a test item record in the database
      const testItem = await createItem({
        ...itemTestData,
        seller: user.id,
      });

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

  describe("Delete Multiple Items", () => {
    it("should delete multiple items by their IDs DELETE:", async () => {
      // Create test data by inserting item records into the database
      const item1 = await createItem({ ...itemData1, seller: user.id });
      const item2 = await createItem({ ...itemData2, seller: user.id });

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

  describe("Update Existing Items", () => {
    it("should edit an existing item PATCH", async () => {
      // Find an existing item (assuming it exists)
      const itemToUpdate = await createItem({
        ...existingItemData,
        seller: user.id,
      });
      // If an item with the specified name exists, update it
      const response = await agent
        .patch(`${itemTestBaseUrl}/${itemToUpdate.id}`)
        .send(updatedNegotiable)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.negotiable).toBe(updatedNegotiable.negotiable);
    });
  });
});
