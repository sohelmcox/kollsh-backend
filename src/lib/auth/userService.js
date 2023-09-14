const { User } = require("../../models");
const fields =
  "+password +passwordResetAttempts +resetPasswordCode +resetPasswordRCodeExpires +confirmationCodeExpires +emailVerificationAttempts";
const findUserByEmail = async (email) => {
  const user = User.findOne({ email }).select(fields);
  return user;
};
const findByUsernameAndEmail = async (email) => {
  // const user = await User.findOne({ $or: [{ username }, { email }] });
  const user = await User.findOne({ email }).select(fields);
  return user;
};
const findByUsername = async (username) => {
  const user = await User.findOne({ username }).select(fields);
  return user;
};
const findUserById = async (id) => {
  const user = await User.findById(id).select(fields);
  return user;
};

const findByIdentifier = async (identifier) => {
  // const user = await User.findOne({
  //   $or: [{ username: identifier }, { email: identifier }],
  // }).select(fields);
  const user = await User.findOne({ email: identifier }).select(fields);
  return user;
};

module.exports = {
  findUserByEmail,
  findByUsername,
  findByIdentifier,
  findUserById,
};
