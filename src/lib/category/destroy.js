const { Category } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an category by its ID.
 *
 * @param {string} id - The ID of the category to be deleted.
 * @throws {Error} - Throws an error if the category with the provided ID is not found.
 */
const destroy = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw notFound("Category not found.");
  }
  await category.deleteOne();
};
module.exports = destroy;
