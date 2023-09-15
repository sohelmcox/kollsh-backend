const roleServices = require("../../../../lib/role");
/**
 * Create a new item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { name, description, permissions } = req.body;
  try {
    const role = await roleServices.create({
      name,
      description,
      permissions,
      createdBy: req.user.id,
    });
    const response = {
      code: 201,
      message: "Role Created Successfully",
      id: role.id,
      data: role,
      links: {
        self: `/roles/${role.id}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
