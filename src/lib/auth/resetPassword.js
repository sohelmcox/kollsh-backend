const { User } = require("../../models");
const { userServices } = require("..");
const { badRequest } = require("../../utils/error");
const { findUserByEmail } = require("./userService");
const { hashing } = require("../../utils");

const verifyPasswordResetCode = async (resetPasswordCode) => {
  // Verify if the reset code matches and has not expired
  const user = await User.findOne({ resetPasswordCode });
  if (
    !user ||
    user.resetPasswordCode !== resetPasswordCode ||
    user.resetPasswordRCodeExpires < Date.now()
  ) {
    return false; // Invalid or expired code
  }

  return user; // Valid code
};
const deletePasswordResetCode = async (email) => {
  // Delete the reset code from the user model
  try {
    await User.findOneAndUpdate(
      { email },
      { resetPasswordCode: null, resetPasswordRCodeExpires: null },
    );
  } catch (error) {
    throw badRequest(error.message);
  }
  // TODO Handle errors if any
};
const resetPassword = async ({
  resetPasswordCode,
  newPassword,
  passwordConfirmation,
}) => {
  // Check if the passwords match
  if (newPassword !== passwordConfirmation) {
    throw badRequest("Password confirmation does not match password.");
  }
  // Verify the reset code and its expiration
  const user = await verifyPasswordResetCode(resetPasswordCode);
  if (!user) {
    throw badRequest("Invalid or expired reset code.");
  }
  const { email } = user;
  // Update the user's password
  const hashedPassword = await hashing.generateHash(newPassword);
  await userServices.updatePassword({ email, newPassword: hashedPassword });

  // Delete the reset code from the database
  await deletePasswordResetCode(email);
  return { status: 200, message: "Password reset successful." };
};

const resetPasswordAttempts = async ({ email }) => {
  // Check if the user exists
  const user = await findUserByEmail(email);
  if (!user) {
    throw badRequest("User not found.");
  }
  return user.passwordResetAttempts;
};

module.exports = { resetPassword, resetPasswordAttempts };
