const attributeServices = require("../../../../lib/attribute");
/**
 * Create a new Attribute.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { name, attribute_values, subcategories, brands } = req.body;
  try {
    const attribute = await attributeServices.create({
      name,
      attribute_values,
      subcategories,
      brands,
    });
    const { id: attributeId } = attribute;
    const response = {
      code: 201,
      message: "Attribute Created Successfully",
      data: attribute,
      links: {
        self: `/attributes/${attributeId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
