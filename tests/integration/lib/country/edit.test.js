const { edit } = require("../../../../src/lib/country");
const { Country } = require("../../../../src/models");
const { updatedCountryData } = require("../../../testSeed/country");

// Mock the Country model's methods
jest.mock("../../../../src/models", () => {
  const mockCountry = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    Country: {
      findById: mockCountry.findById,
    },
  };
});

describe("Country Edit Service", () => {
  it("should edit an existing country", async () => {
    // Mock the findById method to return a country
    const existingCountry = {
      id: "countryId",
      name: "Old Country",
      flag_image: "string or id",
      code: "string",
      save: jest.fn(),
    };
    Country.findById.mockResolvedValue(existingCountry);

    const result = await edit("countryId", updatedCountryData);

    // Verify that the findById method was called with the correct ID
    expect(Country.findById).toHaveBeenCalledWith("countryId");

    // Verify that the country's properties were updated correctly
    expect(existingCountry.name).toBe(updatedCountryData.name);
    expect(existingCountry.code).toBe(updatedCountryData.code);
    expect(existingCountry.flag_image).toBe(updatedCountryData.flag_image);

    // Verify that the save method was called on the country instance
    expect(existingCountry.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("countryId");
  });

  it("should throw an error if the country is not found", async () => {
    // Mock the findById method to return null, indicating the country was not found
    Country.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentCountryId", updatedCountryData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Country not found.");
    }
  });
});
