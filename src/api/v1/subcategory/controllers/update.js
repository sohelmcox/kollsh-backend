const subcategoryServices = require("../../../../lib/subcategory");
/**
 * Update subcategory.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, category, image, cover_image, priority, is_brand } = req.body;
  try {
    const { data, code } = await subcategoryServices.updateOrCreate(id, {
      name,
      category,
      image,
      cover_image,
      priority,
      is_brand,
    });
    const { id: subcategoryId, category: categoryId } = data;
    const response = {
      code,
      message:
        code === 200
          ? "Subcategory updated successfully"
          : "Subcategory created successfully",
      data,
      links: {
        self: `/subcategories/${subcategoryId}`,
        category: `/categories/${categoryId}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
