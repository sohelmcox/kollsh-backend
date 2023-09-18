const { User } = require("../../models");
/**
 * Destroy (delete) multiple users by their IDs.
 *
 * @param {string[]} userIds - An array of IDs of the users to be deleted.
 * @returns {number} - The number of deleted users.
 * @throws {Error} - Throws an error if there was an issue while deleting users.
 */
const destroyMany = async (userIds) => {
  try {
    const result = await User.deleteMany({ _id: { $in: userIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting users: ${error.message}`);
  }
};
module.exports = destroyMany;
