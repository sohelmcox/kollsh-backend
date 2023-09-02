const { User } = require("../../models");
const { userServices } = require("..");
const { badRequest } = require("../../utils/error");
const { findUserByEmail } = require("../user");
const { hashing } = require("../../utils");

const verifyPasswordResetCode = async (email, resetPasswordCode) => {
  // Verify if the reset code matches and has not expired
  const user = await findUserByEmail(email);

  if (
    !user ||
    user.resetPasswordCode !== resetPasswordCode ||
    user.resetPasswordRCodeExpires < Date.now()
  ) {
    return false; // Invalid or expired code
  }

  return true; // Valid code
};
const deletePasswordResetCode = async (email) => {
  // Delete the reset code from the user model
  await User.findOneAndUpdate(
    { email },
    { resetPasswordCode: null, resetPasswordRCodeExpires: null },
  );

  // TODO Handle errors if any
};
const resetPassword = async ({
  email,
  resetPasswordCode,
  newPassword,
  passwordConfirmation,
}) => {
  // Check if the passwords match
  if (newPassword !== passwordConfirmation) {
    throw badRequest("Password confirmation does not match password.");
  }
  // Verify the reset code and its expiration
  const isValidCode = await verifyPasswordResetCode(email, resetPasswordCode);
  if (!isValidCode) {
    throw badRequest("Invalid or expired reset code.");
  }

  // Update the user's password
  const hashedPassword = await hashing.generateHash(newPassword);
  await userServices.updatePassword({ email, newPassword: hashedPassword });

  // Delete the reset code from the database
  await deletePasswordResetCode(email);
  return { message: "Password reset successful." };
};
module.exports = resetPassword;
