const { hashing } = require("../../utils");
const { badRequest } = require("../../utils/error");
const { findUserById, updatePassword } = require("./utils");

const changePassword = async ({ id, password, passwordConfirmation }) => {
  // Check if the passwords match
  if (password !== passwordConfirmation) {
    throw badRequest("Password confirmation does not match password.");
  }
  const user = await findUserById(id);
  if (!user) {
    throw badRequest("User Not Found");
  }
  const { email } = user;
  // Update the user's password
  const hashedPassword = await hashing.generateHash(password);
  await updatePassword({ email, newPassword: hashedPassword });

  return { status: 200, message: "Password changed successfully." };
};
module.exports = changePassword;
