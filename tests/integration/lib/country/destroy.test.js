const { destroy } = require("../../../../src/lib/country");
const { Country } = require("../../../../src/models");

// Mock the Country model's methods
jest.mock("../../../../src/models", () => {
  const mockCountry = {
    findById: jest.fn(),
  };

  return {
    Country: {
      findById: mockCountry.findById,
    },
  };
});

describe("Country Destroy Service", () => {
  it("should destroy an existing country", async () => {
    // Mock the findById method to return a country
    const mockCountryInstance = {
      deleteOne: jest.fn(),
    };
    Country.findById.mockResolvedValue(mockCountryInstance);

    await destroy("countryId");

    // Verify that the findById method was called with the correct ID
    expect(Country.findById).toHaveBeenCalledWith("countryId");

    // Verify that the deleteOne method was called on the country instance
    expect(mockCountryInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the country is not found", async () => {
    // Mock the findById method to return null, indicating the country was not found
    Country.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent country
    try {
      await destroy("nonExistentCountryId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Country not found.");
      expect(error.status).toBe(404);
    }
  });
});
