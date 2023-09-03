const { User } = require("../models");

function hasPermission(controller, action) {
  return async (req, res, next) => {
    const { id } = req.user;
    try {
      const user = await User.findById(id).populate({
        path: "role",
        populate: [{ path: "permissions" }],
      });
      if (!user) {
        return res.status(403).json({ message: "User not found" });
      }
      const { permissions } = user.role;

      const hasRequiredPermission = permissions.some(
        (permission) =>
          permission.controller === controller &&
          permission.actions.includes(action),
      );

      // console.log(hasRequiredPermission);

      if (hasRequiredPermission) {
        next();
      } else {
        res.status(403).json({ message: "Permission denied" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = {
  hasPermission,
};
