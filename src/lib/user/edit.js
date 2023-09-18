const { User } = require("../../models");
const { getUserDTO } = require("../../utils");
const { notFound } = require("../../utils/error");

/**
 * Edit (update) an user by its ID.
 *
 * @param {Object} userData - Data to create a new user.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @param {string} userData.confirmed - The confirmed of the user.
 * @param {string} userData.blocked - The blocked of the user.
 *
 * @returns {Object} - The edited user with additional properties (id).
 * @throws {Error} - Throws an error if the user with the provided ID is not found.
 */

const edit = async (id, { name, username, email, confirmed, blocked }) => {
  const user = await User.findById(id);
  if (!user) {
    throw notFound("User not found.");
  }
  const payload = {
    name,
    username,
    email,
    confirmed,
    blocked,
  };

  Object.keys(payload).forEach((key) => {
    user[key] = payload[key] ?? user[key];
  });

  await user.save();
  const result = getUserDTO(user);
  return { id: user.id, ...result };
};

module.exports = edit;
