const { roleServices } = require("../../../../lib");

const find = async (req, res, next) => {
  try {
    const roles = await roleServices.find();
    res.json(roles);
  } catch (error) {
    next(error);
  }
};
module.exports = find;
