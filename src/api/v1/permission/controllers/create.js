const permissionServices = require("../../../../lib/permission");
/**
 * Create a new permission.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { controller, actions, description } = req.body;
  try {
    const permission = await permissionServices.create({
      controller,
      actions,
      description,
      createdBy: req.user.id,
    });
    const response = {
      code: 201,
      message: "Permission Created Successfully",
      id: permission.id,
      data: permission,
      links: {
        self: `/permissions/${permission.id}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
