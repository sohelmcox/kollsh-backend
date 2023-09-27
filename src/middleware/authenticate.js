const tokenService = require("../lib/token");
const { findUserByEmail } = require("../lib/auth/userService");
const { authenticationError } = require("../utils/error");
const { getUserDTO } = require("../utils");
const authenticate = async (req, _res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = tokenService.decodeToken({ token });
    if (!decoded) {
      next(
        authenticationError(
          "Your token expired or invalid. Provide a Valid Token",
        ),
      );
    }
    const user = await findUserByEmail(decoded.email);
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
    req.user = { ...userDTO };
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = authenticate;
