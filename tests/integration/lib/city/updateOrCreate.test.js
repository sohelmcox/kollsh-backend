const { updateOrCreate } = require("../../../../src/lib/city");
const { City } = require("../../../../src/models");
const {
  newCityData,
  updatedCityData,
  existingCityData,
} = require("../../../testSeed/city");
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
  it("should create a new city if it does not exist", async () => {
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
  it("should update an existing city if it exists", async () => {
    // Mock an existing city
    const existingCity = {
      id: "existingCityId",
      state: "StateId",
      priority: 1,
      overwrite: jest.fn(),
      save: jest.fn(),
    };
    City.findById.mockResolvedValue(existingCity);

    // Mock the findOne method to return null, indicating the city name is not found
    City.findOne.mockResolvedValue(null);

    const result = await updateOrCreate("existingCityId", updatedCityData);

    // Verify that the findById method was called with the correct ID
    expect(City.findById).toHaveBeenCalledWith("existingCityId");

    // Verify that the overwrite and save methods were called on the existing city
    expect(existingCity.overwrite).toHaveBeenCalledWith({
      name: updatedCityData.name,
      state: updatedCityData.state,
      priority: updatedCityData.priority,
    });
    expect(existingCity.save).toHaveBeenCalled();

    // Verify the result
    // expect(result.data).toEqual({ ...existingCity });
    expect(result.code).toBe(200);
  });

  it("should throw a badRequest error if the city name already exists", async () => {
    // Mock the findById method to return null, indicating the city does not exist
    City.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing city with the same name

    City.findOne.mockResolvedValue(existingCityData);

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
