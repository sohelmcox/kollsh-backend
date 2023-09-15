const { Permission } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an permission by its ID.
 *
 * @param {string} id - The ID of the permission to be deleted.
 * @throws {Error} - Throws an error if the permission with the provided ID is not found.
 */
const destroy = async (id) => {
  const permission = await Permission.findById(id);
  if (!permission) {
    throw notFound("Permission not found.");
  }
  await permission.deleteOne();
};
module.exports = destroy;
