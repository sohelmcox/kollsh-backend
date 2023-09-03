const { permissionServices } = require("../../../../lib");

const update = async (req, res, next) => {
  const { permissionId } = req.params;
  const permissionData = req.body;
  try {
    const updatedPermission = await permissionServices.update(
      permissionId,
      permissionData,
    );
    res.status(200).json(updatedPermission);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
