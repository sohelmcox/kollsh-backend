const categoryServices = require("../../../../lib/category");
/**
 * Update category.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, image, cover_image, priority, featured } = req.body;
  try {
    const { data, code } = await categoryServices.updateOrCreate(id, {
      name,
      image,
      cover_image,
      priority,
      featured,
    });
    const { id: categoryId } = data;
    const response = {
      code,
      message:
        code === 200
          ? "Category updated successfully"
          : "Category created successfully",
      data,
      links: {
        self: `/categories/${categoryId}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
