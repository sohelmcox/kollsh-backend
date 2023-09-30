// setup database test connection
require("../../setup/testSetup");
const {
  create: createItemSuggestion,
} = require("../../../src/lib/itemSuggestion");
const {
  itemSuggestionData1,
  itemSuggestionData2,
  itemSuggestionTestData,
  createItemSuggestionData,
  newItemSuggestionData,
  updatedItemSuggestionData,
  existingItemSuggestionData,
  updatedUser,
  permissionsData,
  rolesData,
} = require("../../testSeed/itemSuggestion");
const agent = require("../../agent");
const {
  ItemSuggestion,
  User,
  Role,
  Permission,
} = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const itemSuggestionTestBaseUrl = `${testBaseUrl}/item-suggestions`;
const findItemSuggestionByProperty = async (property, value) => {
  const itemSuggestion = await ItemSuggestion.findOne({ [property]: value });
  return itemSuggestion;
};
describe("ItemSuggestion API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial ItemSuggestion
    await Promise.all(
      createItemSuggestionData.map(async (itemSuggestion) => {
        await createItemSuggestion({ ...itemSuggestion });
      }),
    );
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await ItemSuggestion.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new ItemSuggestion", () => {
    it("should create a new itemSuggestion POST", async () => {
      const response = await agent
        .post(itemSuggestionTestBaseUrl)
        .send(newItemSuggestionData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.user).toBe(newItemSuggestionData.user);
    });
  });
  describe("Retrieve Multiple ItemSuggestions", () => {
    it("should retrieve a list of itemSuggestions GET:", async () => {
      const response = await agent.get(itemSuggestionTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple ItemSuggestions", () => {
    it("should delete multiple itemSuggestions by their IDs DELETE:", async () => {
      // Create test data by inserting itemSuggestion records into the database
      const itemSuggestion1 = await createItemSuggestion({
        ...itemSuggestionData1,
      });
      const itemSuggestion2 = await createItemSuggestion({
        ...itemSuggestionData2,
      });

      // Retrieve the IDs of the created itemSuggestion records
      const itemSuggestionIdsToDelete = [
        itemSuggestion1.id,
        itemSuggestion2.id,
      ];
      // Delete multiple itemSuggestions by their IDs
      const response = await agent
        .delete(itemSuggestionTestBaseUrl)
        .send({ ids: itemSuggestionIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(202);

      // Verify that the itemSuggestions with the specified IDs no longer exist in the database
      for (const itemSuggestionId of itemSuggestionIdsToDelete) {
        const deletedItemSuggestion = await ItemSuggestion.findById(
          itemSuggestionId,
        );
        expect(deletedItemSuggestion).toBeNull();
      }
    });
  });
  describe("Retrieve Single ItemSuggestions", () => {
    it("should find a single itemSuggestion by its ID GET:", async () => {
      // Create a test itemSuggestion record in the database
      const testItemSuggestion = await createItemSuggestion({
        ...itemSuggestionTestData,
      });
      // Perform a GET request to find the itemSuggestion by its ID
      const response = await agent
        .get(`${itemSuggestionTestBaseUrl}/${testItemSuggestion._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
    });
  });
  describe("Update and Delete ItemSuggestions", () => {
    it("should update a itemSuggestion by Id or create a new one if not found PUT", async () => {
      // Create a test itemSuggestion record in the database
      const existingItemSuggestion = await createItemSuggestion(
        existingItemSuggestionData,
      );

      // Perform a PUT request to update the itemSuggestion by name
      const response = await agent
        .put(`${itemSuggestionTestBaseUrl}/${existingItemSuggestion.id}`)
        .send(updatedItemSuggestionData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.user).toBe(updatedItemSuggestionData.user);

      // Verify that the itemSuggestion with the updated user and description exists in the database
      const updatedItemSuggestionInDB = await findItemSuggestionByProperty(
        "user",
        updatedItemSuggestionData.user,
      );
      expect(updatedItemSuggestionInDB).not.toBeNull();

      // Create data for a itemSuggestion that doesn't exist in the database
      // Perform a PUT request to create a new itemSuggestion
      const createResponse = await agent
        .put(`${itemSuggestionTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newItemSuggestionData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.user).toBe(newItemSuggestionData.user);

      // Verify that the new itemSuggestion exists in the database
      const newItemSuggestionInDB = await findItemSuggestionByProperty(
        "user",
        newItemSuggestionData.user,
      );
      expect(newItemSuggestionInDB).not.toBeNull();
    });
    it("should edit an existing itemSuggestion PATCH", async () => {
      // Find an existing itemSuggestion (assuming it exists)
      const itemSuggestionToUpdate = await findItemSuggestionByProperty(
        "user",
        "557064617465642055756572",
      );
      // If a itemSuggestion with the specified name exists, update it
      const response = await agent
        .patch(`${itemSuggestionTestBaseUrl}/${itemSuggestionToUpdate._id}`)
        .send(updatedUser)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.user).toBe(updatedItemSuggestionData.user);
    });
    it("should delete a itemSuggestion DELETE", async () => {
      const itemSuggestionToDelete = await findItemSuggestionByProperty(
        "user",
        "557064617465642055756572",
      );

      const response = await agent
        .delete(`${itemSuggestionTestBaseUrl}/${itemSuggestionToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(
        await ItemSuggestion.findById(itemSuggestionToDelete._id),
      ).toBeNull();
    });
  });
});
