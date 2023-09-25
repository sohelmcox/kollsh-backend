const { findSingle } = require("../../../../src/lib/state");
const { State } = require("../../../../src/models");
const { newStateData } = require("../../../testSeed/state");

// Mock the State model's methods
jest.mock("../../../../src/models", () => {
  const mockState = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    State: {
      findById: mockState.findById,
    },
  };
});

describe("State Find Single Service", () => {
  it("should find a single state by ID", async () => {
    // Mock the State model's findById method to return a sample state

    State.findById.mockResolvedValue(newStateData);

    const params = {
      id: "newStateId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(State.findById).toHaveBeenCalledWith("newStateId");

    // Verify the result
    expect(result).toEqual(newStateData);
    expect(result.name).toEqual("New State");
  });

  it("should throw a notFound error if state with given ID is not found", async () => {
    // Mock the State model's findById method to return null, indicating the state is not found
    State.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("State not found");
      // console.log(error);
    }
  });
});
