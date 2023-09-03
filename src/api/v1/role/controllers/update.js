const { roleServices } = require("../../../../lib");

const update = async (req, res, next) => {
  const { roleId } = req.params;
  const roleData = req.body;
  try {
    const updatedRole = await roleServices.update(roleId, roleData);
    res.status(200).json(updatedRole);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
