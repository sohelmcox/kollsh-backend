const { User } = require("../../models");
const { hashing, getUserDTO } = require("../../utils");
const { badRequest } = require("../../utils/error");
const { userExist } = require("./utils");

/**
 * Create a new user.
 *
 * @param {Object} userData - Data to create a new user.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @param {string} userData.confirmed - The confirmed of the user.
 * @param {string} userData.blocked - The blocked of the user.
 *
 * @returns {Object} - The newly created user with additional properties (id).
 */
const create = async ({
  name,
  username,
  email,
  password,
  confirmed,
  blocked,
}) => {
  const checkIsExist = await userExist(email);
  if (checkIsExist) {
    throw badRequest("User already exist");
  }
  const hashedPassword = await hashing.generateHash(password);
  const userData = {
    name,
    username,
    email,
    password: hashedPassword,
    confirmed: confirmed ? true : false,
    blocked: blocked ? false : true,
  };
  const newUser = new User(userData);

  // Save the new user to the database
  await newUser.save();
  const result = getUserDTO(newUser);
  return { id: newUser.id, ...result };
};

module.exports = create;
