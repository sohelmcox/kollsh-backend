const bcrypt = require("bcryptjs");
const { badRequest, notFound } = require("../../utils/error");
const getUserTokenPayload = require("../../utils/getUserDTO");
const { generateToken } = require("../token");
const { findByIdentifier } = require("../user");

const localLogin = async (identifier, password) => {
  try {
    const user = await findByIdentifier(identifier);
    if (!user) {
      throw notFound("User not found.");
    }
    if (!user.confirmed) {
      throw badRequest("Please confirm your email.");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw badRequest("Invalid credentials. wrong password ");
    }

    // Generate JWT token
    const payload = getUserTokenPayload(user._doc);
    const token = generateToken({ payload });

    // Replace this with actual user data to return
    const userData = {
      message: "success",
      accessToken: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        confirmed: user.confirmed,
        blocked: user.blocked,
      },
    };

    return userData;
  } catch (error) {
    throw badRequest(error.message);
  }
};
module.exports = localLogin;
