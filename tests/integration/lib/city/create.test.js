const { updateOrCreate } = require("../../../../src/lib/city");
const { City } = require("../../../../src/models");
const { newCityData, existingCity } = require("../../../testSeed/city");
// Mock the City model's methods
jest.mock("../../../../src/models", () => {
  const mockCity = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    City: {
      findById: mockCity.findById,
      findOne: mockCity.findOne,
      create: mockCity.create,
    },
  };
});

describe("City Update or Create Service", () => {
  it("should create a new city", async () => {
    // Mock the findById method to return null, indicating the city does not exist
    City.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the city name is not found
    City.findOne.mockResolvedValue(null);

    // Mock the create method to return a new city instance
    const createdCityInstance = {
      id: "newCityId",
      ...newCityData,
      save: jest.fn(),
    };
    City.create.mockReturnValue(createdCityInstance);

    const result = await updateOrCreate("newCityId", { ...newCityData });
    // console.log(result);
    expect(result.code).toBe(201);
  });

  it("should throw a badRequest error if the city name already exists", async () => {
    // Mock the findById method to return null, indicating the city does not exist
    City.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing city with the same name
    City.findOne.mockResolvedValue(existingCity);

    try {
      await updateOrCreate("newCityId", newCityData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe("City name already exist");
    }
  });
});
