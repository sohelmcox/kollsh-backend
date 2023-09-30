// setup database test connection
require("../../setup/testSetup");
const { create: createState } = require("../../../src/lib/state");
const {
  stateData1,
  stateData2,
  stateTestData,
  createStateData,
  newStateData,
  updatedStateData,
  existingStateData,
  updatedPriority,
  permissionsData,
  rolesData,
} = require("../../testSeed/state");
const agent = require("../../agent");
const { State, User, Permission, Role } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const stateTestBaseUrl = `${testBaseUrl}/states`;
const findStateByProperty = async (property, value) => {
  const state = await State.findOne({ [property]: value });
  return state;
};
describe("State API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial State
    await Promise.all(
      createStateData.map(async (state) => {
        await createState({ ...state });
      }),
    );
  });
  afterEach(async () => {
    // Clean up test data after each test case
    await State.deleteMany({});
    await Permission.deleteMany({});
    await Role.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new State", () => {
    it("should create a new state POST", async () => {
      const response = await agent
        .post(stateTestBaseUrl)
        .send(newStateData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(newStateData.name);
      expect(response.body.data.priority).toBe(newStateData.priority);
    });
  });
  describe("Retrieve Multiple States", () => {
    it("should retrieve a list of states GET:", async () => {
      const response = await agent.get(stateTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple States", () => {
    it("should delete multiple states by their IDs DELETE:", async () => {
      // Create test data by inserting state records into the database
      const state1 = await createState({ ...stateData1 });
      const state2 = await createState({ ...stateData2 });

      // Retrieve the IDs of the created state records
      const stateIdsToDelete = [state1.id, state2.id];
      // Delete multiple states by their IDs
      const response = await agent
        .delete(stateTestBaseUrl)
        .send({ ids: stateIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the states with the specified IDs no longer exist in the database
      for (const stateId of stateIdsToDelete) {
        const deletedState = await State.findById(stateId);
        expect(deletedState).toBeNull();
      }
    });
  });
  describe("Retrieve Single States", () => {
    it("should find a single state by its ID GET:", async () => {
      // Create a test state record in the database
      const testState = await createState({ ...stateTestData });

      // Perform a GET request to find the state by its ID
      const response = await agent
        .get(`${stateTestBaseUrl}/${testState.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testState
      expect(response.body.id).toBe(String(testState.id));
      expect(response.body.data.name).toBe(testState.name);
      expect(response.body.data.priority).toBe(testState.priority);
    });
  });
  describe("Update and Delete States", () => {
    it("should update a state by Id or create a new one if not found PUT", async () => {
      // Create a test state record in the database
      const existingState = await createState(existingStateData);

      // Perform a PUT request to update the state by name
      const response = await agent
        .put(`${stateTestBaseUrl}/${existingState.id}`)
        .send(updatedStateData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedStateData.name);
      expect(response.body.data.priority).toBe(updatedStateData.priority);

      // Verify that the state with the updated name and description exists in the database
      const updatedStateInDB = await findStateByProperty(
        "name",
        updatedStateData.name,
      );
      expect(updatedStateInDB).not.toBeNull();

      // Create data for a state that doesn't exist in the database
      // Perform a PUT request to create a new state
      const createResponse = await agent
        .put(`${stateTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newStateData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(newStateData.name);
      expect(createResponse.body.data.priority).toBe(newStateData.priority);

      // Verify that the new state exists in the database
      const newStateInDB = await findStateByProperty("name", newStateData.name);
      expect(newStateInDB).not.toBeNull();
    });
    it("should edit an existing state PATCH", async () => {
      // Find an existing state (assuming it exists)
      const stateToUpdate = await findStateByProperty("name", "state name");

      // If a state with the specified name exists, update it
      const response = await agent
        .patch(`${stateTestBaseUrl}/${stateToUpdate._id}`)
        .send(updatedPriority)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.priority).toBe(updatedStateData.priority);
    });
    it("should delete a state DELETE", async () => {
      const stateToDelete = await findStateByProperty("name", "state name");

      const response = await agent
        .delete(`${stateTestBaseUrl}/${stateToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await State.findById(stateToDelete._id)).toBeNull();
    });
  });
});
