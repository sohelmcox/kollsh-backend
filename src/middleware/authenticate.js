const tokenService = require("../lib/token");
const userService = require("../lib/user");
const { authenticationError } = require("../utils/error");
const { getUserDTO } = require("../utils");

const authenticate = async (req, _res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(req.headers);
  try {
    const decoded = tokenService.decodeToken({ token });
    console.log("decoded", decoded);
    console.log("token", token);
    const user = await userService.findUserByEmail(decoded.email);
    console.log("user", user);
    if (!user) {
      next(authenticationError("user not found"));
    }
    if (!user.confirmed) {
      next(
        authenticationError(
          "Your account is not verified. Please verify your account",
        ),
      );
    }
    if (user.blocked) {
      next(authenticationError("Your account is blocked"));
    }
    const userDTO = getUserDTO(user);
    req.user = { userDTO, id: user._id };
    next();
  } catch (e) {
    next(authenticationError());
  }
};

module.exports = authenticate;
