const brandServices = require("../../../../lib/brand");
/**
 * Create a new Brand.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { name, image, description, priority } = req.body;
  try {
    const brand = await brandServices.create({
      name,
      image,
      description,
      priority,
    });
    const { id: brandId } = brand;
    const response = {
      code: 201,
      message: "Brand Created Successfully",
      data: brand,
      links: {
        self: `/brands/${brandId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
