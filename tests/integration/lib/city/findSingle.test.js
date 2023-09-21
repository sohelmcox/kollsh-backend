const { findSingle } = require("../../../../src/lib/city");
const { City } = require("../../../../src/models");
const { newCityData } = require("../../../testSeed/city");

// Mock the City model's methods
jest.mock("../../../../src/models", () => {
  const mockCity = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    City: {
      findById: mockCity.findById,
    },
  };
});

describe("City Find Single Service", () => {
  it("should find a single city by ID", async () => {
    // Mock the City model's findById method to return a sample city

    City.findById.mockResolvedValue(newCityData);

    const params = {
      id: "newCityId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(City.findById).toHaveBeenCalledWith("newCityId");

    // Verify the result
    expect(result).toEqual(newCityData);
    expect(result.name).toEqual("New City");
  });

  it("should throw a notFound error if city with given ID is not found", async () => {
    // Mock the City model's findById method to return null, indicating the city is not found
    City.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("City not found");
      // console.log(error);
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
