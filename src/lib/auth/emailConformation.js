const { User } = require("../../models");
const { badRequest } = require("../../utils/error");
const { getUserDTO } = require("../../utils");
const { generateToken } = require("../token");

// email verification
const emailConformation = async (confirmationCode) => {
  try {
    const user = await User.findOne({
      confirmationCode,
      confirmationCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw badRequest("Invalid or expired verification code.");
    }

    user.confirmed = true;
    const newUser = await user.save();
    const userPayload = getUserDTO(newUser);
    const accessToken = generateToken({ payload: userPayload });
    const userData = {
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        confirmed: user.confirmed,
        blocked: user.blocked,
      },
    };
    if (newUser.confirmed) {
      return { message: "success", ...userData };
    }
    return badRequest("Invalid or expired verification code.");
  } catch (error) {
    throw badRequest(error.message);
  }
};
module.exports = emailConformation;
