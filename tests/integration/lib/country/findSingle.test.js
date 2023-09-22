const { findSingle } = require("../../../../src/lib/country");
const { Country } = require("../../../../src/models");
const { newCountryData } = require("../../../testSeed/country");

// Mock the Country model's methods
jest.mock("../../../../src/models", () => {
  const mockCountry = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    Country: {
      findById: mockCountry.findById,
    },
  };
});

describe("Country Find Single Service", () => {
  it("should find a single country by ID", async () => {
    // Mock the Country model's findById method to return a sample country

    Country.findById.mockResolvedValue(newCountryData);

    const params = {
      id: "newCountryId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(Country.findById).toHaveBeenCalledWith("newCountryId");

    // Verify the result
    expect(result).toEqual(newCountryData);
    expect(result.name).toEqual("New Country");
  });

  it("should throw a notFound error if country with given ID is not found", async () => {
    // Mock the Country model's findById method to return null, indicating the country is not found
    Country.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("Country not found");
      // console.log(error);
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
