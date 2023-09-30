// setup database test connection
require("../../setup/testSetup");
const { create: createCity } = require("../../../src/lib/city");
const {
  cityData1,
  cityData2,
  cityTestData,
  createCityData,
  newCityData,
  updatedCityData,
  existingCityData,
  updatedDescription,
  updatedName,
  permissionsData,
  rolesData,
} = require("../../testSeed/city");
const agent = require("../../agent");
const { City, User, Permission, Role } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const cityTestBaseUrl = `${testBaseUrl}/cities`;
const findCityByProperty = async (property, value) => {
  const city = await City.findOne({ [property]: value });
  return city;
};
describe("City API Integration Tests", () => {
  let user;

  beforeEach(async () => {
    // Create user and role
    const permissions = await Permission.create(permissionsData);
    rolesData.permissions = permissions._id;
    const role = await Role.create(rolesData);
    user = await createTestUser(role._id);

    // Create initial cities
    await Promise.all(
      createCityData.map(async (city) => {
        await createCity({ ...city });
      }),
    );
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await City.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new City", () => {
    it("should create a new city POST", async () => {
      const response = await agent
        .post(cityTestBaseUrl)
        .send(newCityData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(newCityData.name);
      expect(response.body.data.priority).toBe(newCityData.priority);
    });
  });
  describe("Retrieve Multiple Cities", () => {
    it("should retrieve a list of cities GET:", async () => {
      const response = await agent.get(cityTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Cities", () => {
    it("should delete multiple cities by their IDs DELETE:", async () => {
      // Create test data by inserting city records into the database
      const city1 = await createCity({ ...cityData1 });
      const city2 = await createCity({ ...cityData2 });

      // Retrieve the IDs of the created city records
      const cityIdsToDelete = [city1.id, city2.id];
      // Delete multiple cities by their IDs
      const response = await agent
        .delete(cityTestBaseUrl)
        .send({ ids: cityIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the cities with the specified IDs no longer exist in the database
      for (const cityId of cityIdsToDelete) {
        const deletedCity = await City.findById(cityId);
        expect(deletedCity).toBeNull();
      }
    });
  });
  describe("Retrieve Single Cities", () => {
    it("should find a single city by its ID GET:", async () => {
      // Create a test city record in the database
      const testCity = await createCity({ ...cityTestData });

      // Perform a GET request to find the city by its ID
      const response = await agent
        .get(`${cityTestBaseUrl}/${testCity.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);
      // console.log(response.body);
      // Check if the response matches the testCity
      expect(response.body.id).toBe(String(testCity.id));
      expect(response.body.data.name).toBe(testCity.name);
      expect(response.body.data.priority).toBe(testCity.priority);
    });
  });
  describe("Update and Delete Cities", () => {
    it("should update a city by Id or create a new one if not found PUT", async () => {
      // Create a test city record in the database
      const existingCity = await createCity(existingCityData);

      // Perform a PUT request to update the city by name
      const response = await agent
        .put(`${cityTestBaseUrl}/${existingCity.id}`)
        .send(updatedCityData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedCityData.name);
      expect(response.body.data.priority).toBe(updatedCityData.priority);

      // Verify that the city with the updated name and priority exists in the database
      const updatedCityInDB = await findCityByProperty(
        "name",
        updatedCityData.name,
      );
      expect(updatedCityInDB).not.toBeNull();

      // Create data for a city that doesn't exist in the database
      // Perform a PUT request to create a new city
      const createResponse = await agent
        .put(`${cityTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newCityData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(newCityData.name);
      expect(createResponse.body.data.priority).toBe(newCityData.priority);

      // Verify that the new city exists in the database
      const newCityInDB = await findCityByProperty("name", newCityData.name);
      expect(newCityInDB).not.toBeNull();
    });
    it("should edit an existing city PATCH", async () => {
      // Find an existing city (assuming it exists)
      const cityToUpdate = await findCityByProperty("name", "city name");

      // If a city with the specified name exists, update it
      const response = await agent
        .patch(`${cityTestBaseUrl}/${cityToUpdate._id}`)
        .send(updatedName)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedCityData.name);
    });
    it("should delete a city DELETE", async () => {
      const cityToDelete = await findCityByProperty("name", "string");

      const response = await agent
        .delete(`${cityTestBaseUrl}/${cityToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await City.findById(cityToDelete._id)).toBeNull();
    });
  });
});
