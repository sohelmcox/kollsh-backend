const { roleServices } = require("../../../../lib");

const findSingle = async (req, res, next) => {
  const { roleId } = req.params;
  try {
    const role = await roleServices.getById(roleId);
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
