const { Role } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an role by its ID.
 *
 * @param {string} id - The ID of the role to be edited.
 * @param {Object} data - Updated data for the role.
 * @param {string} data.name - The updated name of the role.
 * @param {string} data.description - The updated description of the role.
 * @param {string} data.permission - The updated permission of the role.
 *
 * @returns {Object} - The edited role with additional properties (id).
 * @throws {Error} - Throws an error if the role with the provided ID is not found.
 */

const edit = async (id, { name, description, permissions }) => {
  const role = await Role.findById(id);
  if (!role) {
    throw notFound("Role not found.");
  }

  const payload = {
    name,
    description,
    permissions,
  };

  Object.keys(payload).forEach((key) => {
    role[key] = payload[key] ?? role[key];
  });

  await role.save();
  return { ...role._doc, id: role.id };
};

module.exports = edit;
