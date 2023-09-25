const { destroyMany } = require("../../../../src/lib/state");
const { State } = require("../../../../src/models");

describe("State Destroy Many Service", () => {
  it("should delete multiple states by their IDs", async () => {
    // Create a mock for the State model
    const mockStateModel = {
      deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
    };

    // Replace the State model with the mock model for this test
    jest
      .spyOn(State, "deleteMany")
      .mockImplementation(mockStateModel.deleteMany);

    const stateIdsToDelete = ["stateId1", "stateId2"]; // Replace with valid state IDs

    const deletedCount = await destroyMany(stateIdsToDelete);

    // Verify that the deleteMany method was called with the correct IDs
    expect(mockStateModel.deleteMany).toHaveBeenCalledWith({
      _id: { $in: stateIdsToDelete },
    });

    // Verify the deletedCount returned by the service
    expect(deletedCount).toEqual(2);
  });

  it("should throw an error if there was an issue while deleting states", async () => {
    // Create a mock for the State model
    const mockStateModel = {
      deleteMany: jest
        .fn()
        .mockRejectedValue(new Error("Error deleting states")),
    };

    // Replace the State model with the mock model for this test
    jest
      .spyOn(State, "deleteMany")
      .mockImplementation(mockStateModel.deleteMany);

    const stateIdsToDelete = ["stateId1", "stateId2"];

    // Expecting the service to throw an error
    await expect(destroyMany(stateIdsToDelete)).rejects.toThrowError(
      "Error deleting states",
    );
  });
});
