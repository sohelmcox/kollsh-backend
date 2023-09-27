const { findSingle } = require("../../../../src/lib/user");
const { User } = require("../../../../src/models");
const { newUserData } = require("../../../testSeed/user");

// Mock the User model's methods
jest.mock("../../../../src/models", () => {
  const mockUser = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    User: {
      findById: mockUser.findById,
    },
  };
});

describe("User Find Single Service", () => {
  it("should find a single user by ID", async () => {
    // Mock the User model's findById method to return a sample user

    User.findById.mockResolvedValue(newUserData);

    const params = {
      id: "newUserId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(User.findById).toHaveBeenCalledWith("newUserId");

    // Verify the result
    expect(result).toEqual(newUserData);
    expect(result.name).toEqual("New User");
  });

  it("should throw a notFound error if user with given ID is not found", async () => {
    // Mock the User model's findById method to return null, indicating the user is not found
    User.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("User Not Found");
      // console.log(error);
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
