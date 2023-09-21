const { destroy } = require("../../../../src/lib/city");
const { City } = require("../../../../src/models");

// Mock the City model's methods
jest.mock("../../../../src/models", () => {
  const mockCity = {
    findById: jest.fn(),
  };

  return {
    City: {
      findById: mockCity.findById,
    },
  };
});

describe("City Destroy Service", () => {
  it("should destroy an existing city", async () => {
    // Mock the findById method to return a city
    const mockCityInstance = {
      deleteOne: jest.fn(),
    };
    City.findById.mockResolvedValue(mockCityInstance);

    await destroy("cityId");

    // Verify that the findById method was called with the correct ID
    expect(City.findById).toHaveBeenCalledWith("cityId");

    // Verify that the deleteOne method was called on the city instance
    expect(mockCityInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the city is not found", async () => {
    // Mock the findById method to return null, indicating the city was not found
    City.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent city
    try {
      await destroy("nonExistentCityId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("City not found.");
      expect(error.status).toBe(404);
    }
  });
});
