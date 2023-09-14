const { Role } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Create a new role.
 *
 * @param {Object} roleData - Data to create a new role.
 * @param {string} roleData.name - The name of the role.
 * @param {string} roleData.description - The description of the role.
 * @param {string} roleData.permission - The permission of the role.
 * @param {string} roleData.createdBy - The user who created the role.
 *
 * @returns {Object} - The newly created role with additional properties (id).
 */
const create = async ({ name, description, permission, createdBy }) => {
  const checkIsExist = await Role.findOne({ name });
  if (checkIsExist) {
    throw badRequest("Role already exist");
  }
  const roleData = {
    name,
    description,
    permission,
    createdBy,
  };
  const newRole = new Role(roleData);

  // Save the new role to the database
  await newRole.save();

  return { ...newRole._doc, id: newRole.id };
};

module.exports = create;
