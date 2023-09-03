const { roleServices } = require("../../../../lib");
/**
 * Create a new item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const roleData = req.body;
  try {
    const role = await roleServices.create(roleData);
    res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
