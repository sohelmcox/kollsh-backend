const { Permission } = require("../../models");
const { badRequest, notFound } = require("../../utils/error");

const find = async () => {
  const permissions = await Permission.find().populate("permissions");
  return permissions.map((permission) => ({
    ...permission._doc,
    id: permission._id,
  }));
};
const getById = async (permissionId) => {
  const permission = await Permission.findById(permissionId);
  if (!permission) {
    throw badRequest("Permission not found");
  }
  return { ...permission._doc, id: permission._id };
};

const create = async ({ controller, actions, createdBy }) => {
  const obj = {
    controller,
    actions,
    description: "This is a test permission",
    createdBy,
  };
  const permission = new Permission({ ...obj });
  await permission.save();
  return { ...permission._doc, id: permission._id };
};
const update = async (permissionId, permissionData) => {
  const updatedPermission = await Permission.findByIdAndUpdate(
    permissionId,
    permissionData,
    {
      new: true,
    },
  );
  if (!updatedPermission) {
    throw notFound("Permission not found");
  }
  return { ...updatedPermission._doc, id: updatedPermission._id };
};
const destroy = async (permissionId) => {
  const deletedPermission = await Permission.findByIdAndRemove(permissionId);
  return deletedPermission;
};

module.exports = {
  find,
  getById,
  create,
  update,
  destroy,
};
