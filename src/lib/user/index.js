const { User } = require("../../models");
const { getUserDTO } = require("../../utils");

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user._doc;
};
const findByUsernameAndEmail = async (email) => {
  // const user = await User.findOne({ $or: [{ username }, { email }] });
  const user = await User.findOne({ email });
  return user._doc;
};
const findByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user._doc;
};
const findUserById = async (id) => {
  const user = await User.findById(id);
  return user._doc;
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
  findUserById,
  userExist,
  createUser,
  updatePassword,
};
