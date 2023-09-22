const { updateOrCreate } = require("../../../../src/lib/country");
const { Country } = require("../../../../src/models");
const {
  newCountryData,
  existingCountry,
} = require("../../../testSeed/country");
// Mock the Country model's methods
jest.mock("../../../../src/models", () => {
  const mockCountry = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    Country: {
      findById: mockCountry.findById,
      findOne: mockCountry.findOne,
      create: mockCountry.create,
    },
  };
});

describe("Country Update or Create Service", () => {
  it("should create a new country", async () => {
    // Mock the findById method to return null, indicating the country does not exist
    Country.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the country name is not found
    Country.findOne.mockResolvedValue(null);

    // Mock the create method to return a new country instance
    const createdCountryInstance = {
      id: "newCountryId",
      ...newCountryData,
      save: jest.fn(),
    };
    Country.create.mockReturnValue(createdCountryInstance);

    const result = await updateOrCreate("newCountryId", { ...newCountryData });
    // console.log(result);
    expect(result.code).toBe(201);
  });

  it("should throw a badRequest error if the country name already exists", async () => {
    // Mock the findById method to return null, indicating the country does not exist
    Country.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing country with the same name
    Country.findOne.mockResolvedValue(existingCountry);

    try {
      await updateOrCreate("newCountryId", newCountryData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe("Country already exist");
    }
  });
});
