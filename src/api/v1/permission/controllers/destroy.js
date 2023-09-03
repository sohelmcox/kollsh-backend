const { permissionServices } = require("../../../../lib");

const destroy = async (req, res, next) => {
  const { permissionId } = req.params;
  try {
    const deletedPermission = await permissionServices.destroy(permissionId);
    if (!deletedPermission) {
      return res.status(404).json({ message: "permission not found" });
    }
    res.json(deletedPermission);
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
