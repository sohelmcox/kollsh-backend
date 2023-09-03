const { permissionServices } = require("../../../../lib");
/**
 * Create a new item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { controller, actions } = req.body;
  try {
    const permission = await permissionServices.create({
      controller,
      actions,
      createdBy: req.user.id,
    });
    res.status(201).json(permission);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
