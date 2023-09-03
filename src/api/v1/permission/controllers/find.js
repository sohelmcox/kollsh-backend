const { permissionServices } = require("../../../../lib");

const find = async (req, res, next) => {
  try {
    const permissions = await permissionServices.find();
    res.json(permissions);
  } catch (error) {
    next(error);
  }
};
module.exports = find;
