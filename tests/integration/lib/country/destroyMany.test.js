const { destroyMany } = require("../../../../src/lib/country");
const { Country } = require("../../../../src/models");

describe("Country Destroy Many Service", () => {
  it("should delete multiple countries by their IDs", async () => {
    // Create a mock for the Country model
    const mockCountryModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the Country model with the mock model for this test
    jest
      .spyOn(Country, "deleteMany")
      .mockImplementation(mockCountryModel.deleteMany);

    const countryIdsToDelete = ["countryId1", "countryId2"]; // Replace with valid country IDs

    const deletedCount = await destroyMany(countryIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockCountryModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: countryIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting countries", async () => {
    // Create a mock for the Country model
    const mockCountryModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting countries")),
    };

    // Replace the Country model with the mock model for this test
    jest
      .spyOn(Country, "deleteMany")
      .mockImplementation(mockCountryModel.deleteMany);

    const countryIdsToDelete = ["countryId1", "countryId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(countryIdsToDelete)).rejects.toThrowError(
      "Error deleting countries",
    );
  });
});
