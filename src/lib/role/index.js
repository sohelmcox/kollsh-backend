const { Role } = require("../../models");
const { badRequest, notFound } = require("../../utils/error");

const find = async () => {
  const roles = await Role.find().populate("permissions");
  return roles.map((role) => ({ ...role._doc, id: role._id }));
};
const getById = async (roleId) => {
  const role = await Role.findById(roleId).populate("permissions");
  if (!role) {
    throw badRequest("Role not found");
  }
  return { ...role._doc, id: role._id };
};
const findRoleByRoleName = async ({ name }) => {
  const role = await Role.findOne({ name });
  if (!role) {
    throw badRequest("Role not found");
  }
  return { ...role._doc, id: role._id };
};
const create = async (roleData) => {
  const role = new Role(roleData);
  await role.save();
  return { ...role._doc, id: role._id };
};
const update = async (roleId, roleData) => {
  const updatedRole = await Role.findByIdAndUpdate(roleId, roleData, {
    new: true,
  });
  if (!updatedRole) {
    throw notFound("Role not found");
  }
  return { ...updatedRole._doc, id: updatedRole._id };
};
const destroy = async (roleId) => {
  const deletedRole = await Role.findByIdAndRemove(roleId);
  return deletedRole;
};

module.exports = {
  find,
  getById,
  findRoleByRoleName,
  create,
  update,
  destroy,
};
