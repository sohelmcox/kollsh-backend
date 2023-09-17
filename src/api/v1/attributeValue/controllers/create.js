const attributeValueServices = require("../../../../lib/attributeValue");
/**
 * Create a new AttributeValue.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { name, color_code, attribute, value, brands } = req.body;
  try {
    const attributeValue = await attributeValueServices.create({
      name,
      color_code,
      attribute,
      value,
      brands,
    });
    const { id: attributeValueId } = attributeValue;
    const response = {
      code: 201,
      message: "AttributeValue Created Successfully",
      data: attributeValue,
      links: {
        self: `/attribute-values/${attributeValueId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
