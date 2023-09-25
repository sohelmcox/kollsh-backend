const { updateOrCreate } = require("../../../../src/lib/state");
const { State } = require("../../../../src/models");
const { newStateData, existingState } = require("../../../testSeed/state");
// Mock the State model's methods
jest.mock("../../../../src/models", () => {
  const mockState = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    State: {
      findById: mockState.findById,
      findOne: mockState.findOne,
      create: mockState.create,
    },
  };
});

describe("State Update or Create Service", () => {
  it("should create a new state", async () => {
    // Mock the findById method to return null, indicating the state does not exist
    State.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the state name is not found
    State.findOne.mockResolvedValue(null);

    // Mock the create method to return a new state instance
    const createdStateInstance = {
      id: "newStateId",
      ...newStateData,
      save: jest.fn(),
    };
    State.create.mockReturnValue(createdStateInstance);

    const result = await updateOrCreate("newStateId", { ...newStateData });
    // console.log(result);
    expect(result.code).toBe(201);
  });

  it("should throw a badRequest error if the state name already exists", async () => {
    // Mock the findById method to return null, indicating the state does not exist
    State.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing state with the same name
    State.findOne.mockResolvedValue(existingState);

    try {
      await updateOrCreate("newStateId", newStateData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe("State name already exist");
    }
  });
});
