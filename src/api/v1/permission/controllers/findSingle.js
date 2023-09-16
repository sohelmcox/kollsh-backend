const permissionServices = require("../../../../lib/permission");

const findSingle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const permission = await permissionServices.findSingle(id);
    const response = {
      data: permission,
      links: {
        self: `/permissions/${permission.id}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
