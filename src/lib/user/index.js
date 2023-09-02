const { User } = require("../../models");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
const findByUsernameAndEmail = async (email) => {
  // const user = await User.findOne({ $or: [{ username }, { email }] });
  const user = await User.findOne({ email });
  return user;
};
const findByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};
const findByIdentifier = async (identifier) => {
  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
  return user;
};
const userExist = async (username, email) => {
  const user = await findByUsernameAndEmail(username, email);
  return user ? user._doc : false;
};

const createUser = async (userObj) => {
  const user = new User(userObj);
  await user.save();
  return { ...user._doc, id: user.id };
};

const updatePassword = async ({ email, newPassword }) => {
  await User.findOneAndUpdate({ email }, { password: newPassword });
  return true;
};

module.exports = {
  findUserByEmail,
  findByUsername,
  findByIdentifier,
  userExist,
  createUser,
  updatePassword,
};
