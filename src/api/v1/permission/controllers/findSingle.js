const permissionServices = require("../../../../lib/permission");

const findSingle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const permission = await permissionServices.findSingle(id);
    const { id: permissionId } = permission;
    const response = {
      id: permissionId,
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

module.exports = findSingle;
