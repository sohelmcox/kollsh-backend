const { Role } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an role by its ID.
 *
 * @param {string} id - The ID of the role to be deleted.
 * @throws {Error} - Throws an error if the role with the provided ID is not found.
 */
const destroy = async (id) => {
  const role = await Role.findById(id);
  if (!role) {
    throw notFound("Role not found.");
  }
  // TODO:
  // Asynchronously delete all permissions details and images

  await role.deleteOne();
};
module.exports = destroy;
