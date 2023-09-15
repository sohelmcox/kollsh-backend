const { Permission } = require("../../models");

/**
 * Create a new permission.
 *
 * @param {Object} permissionData - Data to create a new permission.
 * @param {string} permissionData.controller - The name of the permission.
 * @param {string} permissionData.actions - The permission of the permission.
 * @param {string} permissionData.description - The description of the permission.
 * @param {string} permissionData.createdBy - The user who created the permission.
 *
 * @returns {Object} - The newly created permission with additional properties (id).
 */
const create = async ({ controller, actions, description, createdBy }) => {
  const roleData = {
    controller,
    actions,
    description,
    createdBy,
  };
  const newPermission = new Permission(roleData);

  // Save the new role to the database
  await newPermission.save();

  return { ...newPermission._doc, id: newPermission.id };
};

module.exports = create;
