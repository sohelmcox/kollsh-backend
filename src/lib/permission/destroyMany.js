const { Permission } = require("../../models");
/**
 * Destroy (delete) multiple permissions by their IDs.
 *
 * @param {string[]} permissionIds - An array of IDs of the permissions to be deleted.
 * @returns {number} - The number of deleted permissions.
 * @throws {Error} - Throws an error if there was an issue while deleting permissions.
 */
const destroyMany = async (permissionIds) => {
  try {
    const result = await Permission.deleteMany({ _id: { $in: permissionIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting permissions: ${error.message}`);
  }
};
module.exports = destroyMany;
