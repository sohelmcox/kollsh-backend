const categoryServices = require("../../../../lib/category");
/**
 * Create a new category.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { name, image, cover_image, priority, featured } = req.body;
  try {
    const category = await categoryServices.create({
      name,
      image,
      cover_image,
      priority,
      featured,
    });
    const { id: categoryId } = category;
    const response = {
      code: 201,
      message: "Brand Created Successfully",
      data: category,
      links: {
        self: `/categories/${categoryId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
