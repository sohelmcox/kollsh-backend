const { Role } = require("../../models");
/**
 * Destroy (delete) multiple roles by their IDs.
 *
 * @param {string[]} roleIds - An array of IDs of the roles to be deleted.
 * @returns {number} - The number of deleted roles.
 * @throws {Error} - Throws an error if there was an issue while deleting roles.
 */
const destroyMany = async (roleIds) => {
  try {
    const result = await Role.deleteMany({ _id: { $in: roleIds } });
    return result.deletedCount;
    // TODO:
    // Asynchronously delete all permission
  } catch (error) {
    throw new Error(`Error deleting roles: ${error.message}`);
  }
};
module.exports = destroyMany;
