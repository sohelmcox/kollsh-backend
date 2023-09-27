const { User } = require("../../models");
const { badRequest } = require("../../utils/error");
const { getUserDTO } = require("../../utils");
const { generateToken } = require("../token");
const verifyConfirmationCode = async (confirmationCode) => {
  // Verify if the confirmation code matches and has not expired
  const user = await User.findOne({ confirmationCode }).select(
    "+confirmationCode +confirmationCodeExpires",
  );
  if (
    !user ||
    user.confirmationCode !== confirmationCode ||
    user.confirmationCodeExpires < Date.now()
  ) {
    return false; // Invalid or expired code
  }

  return user; // Valid code
};
// email verification
const emailConformation = async (confirmationCode) => {
  try {
    const user = await verifyConfirmationCode(confirmationCode);
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
