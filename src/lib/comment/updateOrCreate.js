const { Comment } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Update or create an role by its ID.
 *
 * @param {string} id - The ID of the role to update. If it doesn't exist, a new role will be created.
 * @param {Object} data - Updated data for the role.
 * @param {string} data.name - The updated name of the role.
 * @param {string} data.description - The updated description of the role.
 * @param {string} data.permission - The updated permission of the role.
 * @param {string} data.createdBy - The updated createdBy of the role.
 *
 * @returns {Object} - An object containing the updated role or newly created role and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (
  id,
  { name, description, permission, createdBy },
) => {
  const role = await Comment.findById(id);
  if (!role) {
    const checkIsExist = await Comment.findOne({ name });
    if (checkIsExist) {
      throw badRequest("Role Name already exist");
    }
    const newRole = await Role.create({
      name,
      description,
      permission,
      createdBy,
    });
    await newRole.save();
    return {
      data: { ...newRole._doc },
      code: 201,
    };
  }

  const payload = {
    name,
    description,
    permission,
    createdBy,
  };

  role.overwrite(payload);
  await role.save();

  return { data: { ...role._doc }, code: 200 };
};
module.exports = updateOrCreate;
