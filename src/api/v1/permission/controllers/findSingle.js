const { permissionServices } = require("../../../../lib");

const findSingle = async (req, res, next) => {
  const { permissionId } = req.params;
  try {
    const permission = await permissionServices.getById(permissionId);
    res.status(200).json(permission);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
