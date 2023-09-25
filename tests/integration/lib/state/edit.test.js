const { edit } = require("../../../../src/lib/state");
const { State } = require("../../../../src/models");
const { updatedStateData } = require("../../../testSeed/state");

// Mock the State model's methods
jest.mock("../../../../src/models", () => {
  const mockState = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    State: {
      findById: mockState.findById,
    },
  };
});

describe("State Edit Service", () => {
  it("should edit an existing state", async () => {
    // Mock the findById method to return a state
    const existingState = {
      id: "stateId",
      name: "Old State",
      image: "string or id",
      priority: 0,
      cities: ["string or id", "string or id"],
      country: "string or id",
      save: jest.fn(),
    };
    State.findById.mockResolvedValue(existingState);

    const result = await edit("stateId", updatedStateData);

    // Verify that the findById method was called with the correct ID
    expect(State.findById).toHaveBeenCalledWith("stateId");

    // Verify that the state's properties were updated correctly
    expect(existingState.name).toBe(updatedStateData.name);
    expect(existingState.image).toBe(updatedStateData.image);
    expect(existingState.priority).toBe(updatedStateData.priority);

    // Verify that the save method was called on the state instance
    expect(existingState.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("stateId");
  });

  it("should throw an error if the state is not found", async () => {
    // Mock the findById method to return null, indicating the state was not found
    State.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentStateId", updatedStateData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("State not found.");
    }
  });
});
