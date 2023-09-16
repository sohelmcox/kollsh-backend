const permissionServices = require("../../../../lib/permission");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const permission = await permissionServices.edit(id, req.body);
    const { id: permissionId } = permission;
    const response = {
      code: 200,
      message: "Permission updated successfully",
      data: permission,
      links: {
        self: `/permissions/${permissionId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
