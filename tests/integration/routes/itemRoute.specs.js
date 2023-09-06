const testSetup = require("../../testSetup"); // Import the test setup module

const agent = require("../../agent"); // Import the agent with the global base URL
const { testBaseUrl, accessToken } = require("../../../src/config");
describe("Item Routes - Integration Tests", () => {
  beforeAll(async () => {
    await testSetup.connectDatabase(); // Connect to the test database
  });

  afterAll(async () => {
    await testSetup.disconnectDatabase(); // Disconnect from the test database
  });

  beforeEach(async () => {
    await testSetup.setupDatabase(); // Set up the test database environment
  });

  // Test GET /items route
  it("GET /items should return a list of items", async () => {
    const response = await agent.get(`${testBaseUrl}/items`);
    expect(response.status).toBe(200);
    // Add assertions to verify the response body
  });

  // Test POST /items route
  it("POST /items should create a new item", async () => {
    const newItemData = {
      name: "string",
      description: "string",
      released: "2023-09-05",
      thumbnail: "64c0e03779da93002b059be0",
      subcategory: "64c0e03779da93002b059be0",
      state: "64c0e03779da93002b059be0",
      cities: ["64c0e03779da93002b059be0", "64c0e03779da93002b059be0"],
      price: 0,
      negotiable: true,
      is_argent: true,
      brand: "64c0e03779da93002b059be0",
    };
    const authenticatedRequest = agent
      .post(`${testBaseUrl}/items`)
      .set("Authorization", `Bearer ${accessToken}`);
    const response = await authenticatedRequest.send(newItemData);
    expect(response.status).toBe(201);
    // const response = await agent
    //   .post(`${testBaseUrl}/items`)
    //   .send(newItemData)
    //   .expect("Content-Type", /json/)
    //   .set("Authorization", `Bearer ${accessToken}`); // Include the JWT token in the request headers
    // await authenticatedRequest.send({});
    // expect(response.status).toBe(200);
    // Add assertions to verify the response body
  });

  // Test GET /items/:id route
  // it("GET /items/:id should return a single item", async () => {
  //   const response = await agent.get(`${testBaseUrl}/items/123`);
  //   expect(response.status).toBe(200);
  //   // Add assertions to verify the response body
  // });

  // // Test PUT /items/:id route
  // it("PUT /items/:id should update an existing item", async () => {
  //   const authenticatedRequest = request(agent)
  //     .put("/items/123")
  //     .set("Authorization", "Bearer YOUR_ACCESS_TOKEN");
  //   const response = await authenticatedRequest.send({
  //     // Provide request body data for updating the item
  //   });
  //   expect(response.status).toBe(200);
  //   // Add assertions to verify the response body
  // });

  // // Test PATCH /items/:id route
  // it("PATCH /items/:id should partially update an item", async () => {
  //   const authenticatedRequest = request(agent)
  //     .patch("/items/123")
  //     .set("Authorization", "Bearer YOUR_ACCESS_TOKEN");
  //   const response = await authenticatedRequest.send({
  //     // Provide request body data for partial update
  //   });
  //   expect(response.status).toBe(200);
  //   // Add assertions to verify the response body
  // });

  // // Test DELETE /items/:id route
  // it("DELETE /items/:id should delete an item", async () => {
  //   const authenticatedRequest = request(agent)
  //     .delete("/items/123")
  //     .set("Authorization", "Bearer YOUR_ACCESS_TOKEN");
  //   const response = await authenticatedRequest;
  //   expect(response.status).toBe(204); // Assuming it returns 204 for successful deletion
  // });

  // // Test GET /items/:id/seller route
  // it("GET /items/:id/seller should return seller information for an item", async () => {
  //   const response = await request(agent).get("/items/123/seller");
  //   expect(response.status).toBe(200);
  //   // Add assertions to verify the response body
  // });

  // Write similar test cases for other routes as needed
});
