const { destroy } = require("../../../../src/lib/state");
const { State } = require("../../../../src/models");

// Mock the State model's methods
jest.mock("../../../../src/models", () => {
  const mockState = {
    findById: jest.fn(),
  };

  return {
    State: {
      findById: mockState.findById,
    },
  };
});

describe("State Destroy Service", () => {
  it("should destroy an existing state", async () => {
    // Mock the findById method to return a state
    const mockStateInstance = {
      deleteOne: jest.fn(),
    };
    State.findById.mockResolvedValue(mockStateInstance);

    await destroy("stateId");

    // Verify that the findById method was called with the correct ID
    expect(State.findById).toHaveBeenCalledWith("stateId");

    // Verify that the deleteOne method was called on the state instance
    expect(mockStateInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the state is not found", async () => {
    // Mock the findById method to return null, indicating the state was not found
    State.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent state
    try {
      await destroy("nonExistentStateId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("State not found.");
      expect(error.status).toBe(404);
    }
  });
});
