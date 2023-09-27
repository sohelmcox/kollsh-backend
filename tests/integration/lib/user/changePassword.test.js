const { changePassword } = require("../../../../src/lib/user");
const {
  findUserById,
  updatePassword,
} = require("../../../../src/lib/user/utils");

jest.mock("../../../../src/lib/user/utils", () => ({
  findUserById: jest.fn(),
  updatePassword: jest.fn(),
}));

describe("changePassword Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should change the password when valid data is provided", async () => {
    // Mock the findUserById function to return a user
    findUserById.mockResolvedValue({ email: "user@example.com" });

    // Mock the updatePassword function to resolve successfully
    updatePassword.mockResolvedValue();

    const input = {
      id: "user_id",
      password: "new_password",
      passwordConfirmation: "new_password",
    };

    const result = await changePassword(input);

    expect(findUserById).toHaveBeenCalledWith("user_id");
    expect(updatePassword).toHaveBeenCalledWith({
      email: "user@example.com",
      newPassword: "new_password",
    });
    expect(result).toEqual({
      status: 200,
      message: "Password changed successfully.",
    });
  });

  it("should throw a bad request error when passwords do not match", async () => {
    const input = {
      id: "user_id",
      password: "new_password",
      passwordConfirmation: "wrong_password",
    };
    const expectedErrorMessage =
      "Password confirmation does not match password.";

    await expect(changePassword(input)).rejects.toMatchObject({
      message: expectedErrorMessage,
      status: 400,
      name: "Bad Request",
      details: {},
    });
  });

  it("should throw a bad request error when the user is not found", async () => {
    // Mock the findUserById function to return null, indicating user not found
    findUserById.mockResolvedValue(null);

    const input = {
      id: "nonexistent_user_id",
      password: "new_password",
      passwordConfirmation: "new_password",
    };
    const expectedErrorMessage = "User Not Found";

    await expect(changePassword(input)).rejects.toMatchObject({
      message: expectedErrorMessage,
      status: 400,
      name: "Bad Request",
      details: {},
    });
  });
});
