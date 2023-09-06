const authenticate = require("../../../src/middleware/authenticate");
const userService = require("../../../src/lib/user");
const config = require("../../../src/config");

jest.mock("../../../src/lib/user");

describe("authenticate function", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: `Bearer ${config.accessToken}`,
      },
    };
    res = {};
    next = jest.fn();
  });

  it("should authenticate a valid user", async () => {
    const user = {
      _id: "64f8243f45c55418081d051d",
      id: "64f8243f45c55418081d051d",
      name: "Ibrahim Sifat",
      username: "username",
      email: "ibsifat900@gmail.com",
      confirmed: true,
      blocked: false,
    };

    // Mock the findUserByEmail method of userService
    userService.findUserByEmail.mockResolvedValue(user);

    // Call the authenticate function
    await authenticate(req, res, next);

    // Verify that the user data is attached to the request object
    expect(req.user).toEqual({
      userDTO: {
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        blocked: user.blocked,
        confirmed: user.confirmed,
      },
      id: user._id,
    });

    // Verify that the next function was called
    expect(next).toHaveBeenCalled();
  });

  it("should handle user not found", async () => {
    // Mock the findUserByEmail method of userService to return null
    userService.findUserByEmail.mockResolvedValue(null);

    // Call the authenticate function
    await authenticate(req, res, next);

    // Verify that the authenticationError function was called with the correct message
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "user not found",
        status: 401,
      }),
    );
  });
});
