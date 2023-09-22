const { updateOrCreate } = require("../../../../src/lib/country");
const { Country } = require("../../../../src/models");
const {
  newCountryData,
  updatedCountryData,
  existingCountryData,
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
  it("should create a new country if it does not exist", async () => {
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
  it("should update an existing country if it exists", async () => {
    // Mock an existing country
    const existingCountry = {
      id: "existingCountryId",
      name: "Existing Country",
      flag_image: "string or id",
      code: "string",
      overwrite: jest.fn(),
      save: jest.fn(),
    };
    Country.findById.mockResolvedValue(existingCountry);

    // Mock the findOne method to return null, indicating the country name is not found
    Country.findOne.mockResolvedValue(null);

    const result = await updateOrCreate(
      "existingCountryId",
      updatedCountryData,
    );

    // Verify that the findById method was called with the correct ID
    expect(Country.findById).toHaveBeenCalledWith("existingCountryId");

    // Verify that the overwrite and save methods were called on the existing country
    expect(existingCountry.overwrite).toHaveBeenCalledWith({
      name: updatedCountryData.name,
      flag_image: updatedCountryData.flag_image,
      code: updatedCountryData.code,
    });
    expect(existingCountry.save).toHaveBeenCalled();

    // Verify the result
    // expect(result.data).toEqual({ ...existingCountry });
    expect(result.code).toBe(200);
  });

  it("should throw a badRequest error if the country name already exists", async () => {
    // Mock the findById method to return null, indicating the country does not exist
    Country.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing country with the same name

    Country.findOne.mockResolvedValue(existingCountryData);

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
