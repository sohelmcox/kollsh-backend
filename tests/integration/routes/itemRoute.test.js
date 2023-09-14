const { newItemData, updatedItemData } = require("../../../src/utils/data");
const { Item } = require("../../../src/models");
const agent = require("../../agent");
const {
  testBaseUrl,
  accessToken,
  invalidAccessToken,
} = require("../../../src/config");
const itemService = require("../../../src/lib/item");
const {
  connectDatabase,
  disconnectDatabase,
  setupDatabase,
} = require("../setup/databaseSetup");

beforeAll(async () => {
  // Connect to the test database
  await connectDatabase();
});

afterAll(async () => {
  // Disconnect from the test database
  await disconnectDatabase();
});

beforeEach(async () => {
  // Set up the test database environment
  await setupDatabase();
});

describe("Item Routes - Integration Tests", () => {
  // Test GET /items route
  it("GET /items should return a list of items", async () => {
    await agent
      .get(`${testBaseUrl}/items`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("GET /items/:id should return a single item by ID", async () => {
    const newItem = await itemService.create({ ...newItemData });

    const itemId = newItem._id.toString();
    // console.log("itemId", itemId);
    const response = await agent
      .get(`${testBaseUrl}/items/${itemId}`)
      .expect("Content-Type", /json/)
      .expect(200);

    // expect(response.body).toHaveProperty("name", newItemData.name);
  });

  // Test POST /items route
  it("POST /items should create a new item", async () => {
    // Send a POST request with an access token and the new item data
    const response = await agent
      .post(`${testBaseUrl}/items`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(newItemData)
      .expect("Content-Type", /json/)
      .expect(201);

    // Assertions on the response
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("PUT /items/:id should update an existing item or create a new item if it doesn't exist", async () => {
    // Create a test item in the database

    const existingItem = await itemService.create(newItemData); // Create an existing item

    // Attempt to update the existing item
    const putResponse = await agent
      .put(`${testBaseUrl}/items/${existingItem._id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(updatedItemData);

    // Check if the existing item was updated (status 200)
    if (putResponse.status === 200) {
      const updatedExistingItem = await itemService.findSingle({
        id: existingItem._id,
      });
      expect(updatedExistingItem.name).toBe(updatedItemData.name);
      expect(updatedExistingItem.description).toBe(updatedItemData.description);
    }

    // Check if a new item was created (status 201)
    if (putResponse.status === 201) {
      const newCreatedItem = putResponse.body;
      expect(newCreatedItem.name).toBe(updatedItemData.name);
      expect(newCreatedItem.description).toBe(updatedItemData.description);
    }
  });
  it("PATCH /items/:id should update an existing item if it exists't exist", async () => {
    // Create a test item in the database

    const existingItem = await itemService.create(newItemData); // Create an existing item

    // Attempt to update the existing item
    const putResponse = await agent
      .patch(`${testBaseUrl}/items/${existingItem._id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(updatedItemData);

    // Check if the existing item was updated (status 200)
    if (putResponse.status === 200) {
      const updatedExistingItem = await itemService.findSingle({
        id: existingItem._id,
      });
      expect(updatedExistingItem.name).toBe(updatedItemData.name);
      expect(updatedExistingItem.description).toBe(updatedItemData.description);
    }

    // Check if a new item was created (status 201)
    if (putResponse.status === 201) {
      const newCreatedItem = putResponse.body;
      expect(newCreatedItem.name).toBe(updatedItemData.name);
      expect(newCreatedItem.description).toBe(updatedItemData.description);
    }
  });

  // it("PATCH /items/:id should update an existing item if it exists", async () => {
  //   // Create a test item in the database
  //   const newItem = new Item(newItemData);
  //   await newItem.save();

  //   // Define the update data
  //   const updatedData = {
  //     description: "Updated description",
  //   };

  //   // Make a PATCH request to update the item
  //   const response = await agent
  //     .patch(`${testBaseUrl}/items/${newItem._id}`)
  //     .set("Authorization", `Bearer ${accessToken}`)
  //     .send(updatedData)
  //     .expect("Content-Type", /json/)
  //     .expect(200);

  //   // Assertions for a successful update
  //   expect(response.body).toHaveProperty(
  //     "message",
  //     "Item updated successfully",
  //   );

  //   // Check if the item in the database has been updated
  //   const updatedItem = await Item.findById(newItem._id);
  //   expect(updatedItem.description).toEqual(updatedData.description);
  //   // Add additional assertions for other properties as needed
  // });

  // it("should return a 404 error if the item does not exist", async () => {
  //   // Define an item ID that does not exist in the database
  //   const nonExistentItemId = "650214e2a936759f1ba232a3";

  //   // Make a PATCH request to update a non-existent item
  //   const response = await agent
  //     .patch(`${testBaseUrl}/items/${nonExistentItemId}`)
  //     .set("Authorization", `Bearer ${accessToken}`)
  //     .send({ description: "Updated description" }) // Update data
  //     .expect("Content-Type", /json/)
  //     .expect(404);

  //   // Assertions for a 404 error
  //   expect(response.body).toHaveProperty("message", "Not Found");
  // });
});
