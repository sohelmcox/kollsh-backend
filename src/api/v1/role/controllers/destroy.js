const { roleService } = require("../../../../lib");

const destroy = async (req, res, next) => {
  const { roleId } = req.params;
  try {
    const deletedRole = await roleService.destroy(roleId);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(deletedRole);
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
