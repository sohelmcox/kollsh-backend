const { create: createUser } = require("../../../../src/lib/user");
const { User } = require("../../../../src/models");
const { newUserData, existingUser } = require("../../../testSeed/user");
// Mock the User model's methods
jest.mock("../../../../src/models", () => {
  const mockUser = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    User: {
      findById: mockUser.findById,
      findOne: mockUser.findOne,
      create: mockUser.create,
    },
  };
});

describe("User Update or Create Service", () => {
  it("should create a new user", async () => {
    // Mock the findById method to return null, indicating the user does not exist
    User.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the user name is not found
    User.findOne.mockResolvedValue(null);

    // Mock the create method to return a new user instance
    const createdUserInstance = {
      id: "newUserId",
      ...newUserData,
      save: jest.fn(),
    };
    User.create.mockReturnValue(createdUserInstance);

    const result = await createUser({ ...newUserData });
    // console.log(result);
    expect(result.code).toBe(201);
    expect(result.name).toBe(newUserData.name);
    expect(result.username).toBe(newUserData.username);
    expect(result.email).toBe(newUserData.email);
  });
});
