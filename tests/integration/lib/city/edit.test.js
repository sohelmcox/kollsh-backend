const { edit } = require("../../../../src/lib/city");
const { City } = require("../../../../src/models");
const { updatedCityData } = require("../../../testSeed/city");

// Mock the City model's methods
jest.mock("../../../../src/models", () => {
  const mockCity = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    City: {
      findById: mockCity.findById,
    },
  };
});

describe("City Edit Service", () => {
  it("should edit an existing city", async () => {
    // Mock the findById method to return a city
    const existingCity = {
      id: "cityId",
      name: "Old City",
      slug: "old-city",
      image: "old-image.jpg",
      description: "Old Description",
      priority: 1,
      save: jest.fn(),
    };
    City.findById.mockResolvedValue(existingCity);

    const result = await edit("cityId", updatedCityData);

    // Verify that the findById method was called with the correct ID
    expect(City.findById).toHaveBeenCalledWith("cityId");

    // Verify that the city's properties were updated correctly
    expect(existingCity.name).toBe(updatedCityData.name);
    expect(existingCity.state).toBe(updatedCityData.state);
    expect(existingCity.priority).toBe(updatedCityData.priority);

    // Verify that the save method was called on the city instance
    expect(existingCity.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("cityId");
  });

  it("should throw an error if the city is not found", async () => {
    // Mock the findById method to return null, indicating the city was not found
    City.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentCityId", updatedCityData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("City not found.");
    }
  });
});
