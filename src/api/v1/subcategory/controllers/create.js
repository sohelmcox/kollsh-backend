const subcategoryServices = require("../../../../lib/subcategory");
/**
 * Create a new subcategory.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { name, category, image, cover_image, priority, is_brand } = req.body;
  try {
    const subcategory = await subcategoryServices.create({
      name,
      category,
      image,
      cover_image,
      priority,
      is_brand,
    });
    const { id: subcategoryId, category: parentCategory } = subcategory;
    const response = {
      code: 201,
      message: "Subcategory Created Successfully",
      data: subcategory,
      links: {
        self: `/subcategories/${subcategoryId}`,
        category: `/categories/${parentCategory}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
