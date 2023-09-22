// setup database test connection
require("../../setup/testSetup");
const { create: createCountry } = require("../../../src/lib/country");
const {
  countryData1,
  countryData2,
  countryTestData,
  createCountryData,
  newCountryData,
  updatedCountryData,
  existingCountryData,
  updatedDescription,
} = require("../../testSeed/country");
const agent = require("../../agent");
const { Country, User } = require("../../../src/models");
const { accessToken, testBaseUrl } = require("../../../src/config");
const createTestUser = require("../../setup/createTestUser");
const countryTestBaseUrl = `${testBaseUrl}/countries`;
const findCountryByProperty = async (property, value) => {
  const country = await Country.findOne({ [property]: value });
  return country;
};
describe("Country API Integration Tests", () => {
  beforeEach(async () => {
    createCountryData.forEach(async (country) => {
      await createCountry({ ...country });
    });
    await createTestUser();
  });

  afterEach(async () => {
    // Clean up test data after each test case
    await Country.deleteMany({});
    await User.deleteMany({});
  });
  describe("Create A new Country", () => {
    it("should create a new country POST", async () => {
      const response = await agent
        .post(countryTestBaseUrl)
        .send(newCountryData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(response.statusCode).toBe(201);
      expect(response.body.data.name).toBe(newCountryData.name);
      expect(response.body.data.code).toBe(newCountryData.code);
    });
  });
  describe("Retrieve Multiple Countries", () => {
    it("should retrieve a list of countries GET:", async () => {
      const response = await agent.get(countryTestBaseUrl);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.length).toBe(2);
    });
  });
  describe("Delete Multiple Countries", () => {
    it("should delete multiple countries by their IDs DELETE:", async () => {
      // Create test data by inserting country records into the database
      const country1 = await createCountry({ ...countryData1 });
      const country2 = await createCountry({ ...countryData2 });

      // Retrieve the IDs of the created country records
      const countryIdsToDelete = [country1.id, country2.id];
      // Delete multiple countries by their IDs
      const response = await agent
        .delete(countryTestBaseUrl)
        .send({ ids: countryIdsToDelete })
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);

      // Verify that the countries with the specified IDs no longer exist in the database
      for (const countryId of countryIdsToDelete) {
        const deletedCountry = await Country.findById(countryId);
        expect(deletedCountry).toBeNull();
      }
    });
  });
  describe("Retrieve Single Countries", () => {
    it("should find a single country by its ID GET:", async () => {
      // Create a test country record in the database
      const testCountry = await createCountry({ ...countryTestData });

      // Perform a GET request to find the country by its ID
      const response = await agent
        .get(`${countryTestBaseUrl}/${testCountry.id}`)
        .set("Accept", "application/json");

      expect(response.statusCode).toBe(200);

      // Check if the response matches the testCountry
      expect(response.body.id).toBe(String(testCountry.id));
      expect(response.body.data.name).toBe(testCountry.name);
      expect(response.body.data.code).toBe(testCountry.code);
    });
  });
  describe("Update and Delete Countries", () => {
    it("should update a country by Id or create a new one if not found PUT", async () => {
      // Create a test country record in the database
      const existingCountry = await createCountry(existingCountryData);

      // Perform a PUT request to update the country by name
      const response = await agent
        .put(`${countryTestBaseUrl}/${existingCountry.id}`)
        .send(updatedCountryData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.name).toBe(updatedCountryData.name);
      expect(response.body.data.code).toBe(updatedCountryData.code);

      // Verify that the country with the updated name and description exists in the database
      const updatedCountryInDB = await findCountryByProperty(
        "name",
        updatedCountryData.name,
      );
      expect(updatedCountryInDB).not.toBeNull();

      // Create data for a country that doesn't exist in the database
      // Perform a PUT request to create a new country
      const createResponse = await agent
        .put(`${countryTestBaseUrl}/6502a59b35d01ff95a2c2527`)
        .send(newCountryData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(createResponse.statusCode).toBe(201);
      expect(createResponse.body.data.name).toBe(newCountryData.name);
      expect(createResponse.body.data.code).toBe(newCountryData.code);

      // Verify that the new country exists in the database
      const newCountryInDB = await findCountryByProperty(
        "name",
        newCountryData.name,
      );
      expect(newCountryInDB).not.toBeNull();
    });
    it("should edit an existing country PATCH", async () => {
      // Find an existing country (assuming it exists)
      const countryToUpdate = await findCountryByProperty(
        "name",
        "country name",
      );

      // If a country with the specified name exists, update it
      const response = await agent
        .patch(`${countryTestBaseUrl}/${countryToUpdate._id}`)
        .send(updatedDescription)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data.code).toBe(updatedCountryData.code);
    });
    it("should delete a country DELETE", async () => {
      const countryToDelete = await findCountryByProperty(
        "name",
        "country name",
      );

      const response = await agent
        .delete(`${countryTestBaseUrl}/${countryToDelete._id}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.statusCode).toBe(202);
      expect(await Country.findById(countryToDelete._id)).toBeNull();
    });
  });
});
