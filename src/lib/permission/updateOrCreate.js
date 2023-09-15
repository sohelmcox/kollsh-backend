const { Permission } = require("../../models");

/**
 * Update or create an permission by its ID.
 *
 * @param {string} id - The ID of the permission to update. If it doesn't exist, a new permission will be created.
 * @param {Object} data - Updated data for the permission.
 * @param {string} data.controller - The updated controller of the permission.
 * @param {string} data.description - The updated description of the permission.
 * @param {string} data.actions - The updated actions of the permission.
 * @param {string} data.createdBy - The updated createdBy of the permission.
 *
 * @returns {Object} - An object containing the updated permission or newly created permission and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (
  id,
  { controller, description, actions, createdBy },
) => {
  const permission = await Permission.findById(id);
  if (!permission) {
    const newPermission = await Permission.create({
      controller,
      description,
      actions,
      createdBy,
    });
    await newPermission.save();
    return {
      data: { ...newPermission._doc },
      code: 201,
    };
  }

  const payload = {
    controller,
    description,
    actions,
    createdBy,
  };
  permission.overwrite(payload);
  await permission.save();

  return { data: { ...permission._doc }, code: 200 };
};
module.exports = updateOrCreate;
