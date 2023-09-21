const { destroyMany } = require("../../../../src/lib/city");
const { City } = require("../../../../src/models");

describe("City Destroy Many Service", () => {
  it("should delete multiple cities by their IDs", async () => {
    // Create a mock for the City model
    const mockCityModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the City model with the mock model for this test
    jest.spyOn(City, "deleteMany").mockImplementation(mockCityModel.deleteMany);

    const cityIdsToDelete = ["cityId1", "cityId2"]; // Replace with valid city IDs

    const deletedCount = await destroyMany(cityIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockCityModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: cityIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting cities", async () => {
    // Create a mock for the City model
    const mockCityModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting cities")),
    };

    // Replace the City model with the mock model for this test
    jest.spyOn(City, "deleteMany").mockImplementation(mockCityModel.deleteMany);

    const cityIdsToDelete = ["cityId1", "cityId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(cityIdsToDelete)).rejects.toThrowError(
      "Error deleting cities",
    );
  });
});
