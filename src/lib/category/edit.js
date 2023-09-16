const { Category } = require("../../models");
const { notFound } = require("../../utils/error");
const { slugify } = require("../../utils/generateUniqueSlug");
/**
 * Edit (update) an category by its ID.
 *
 * @param {Object} categoryData - Data to create a new category.
 * @param {string} categoryData.name - The name of the category.
 * @param {string} categoryData.image - The image of the category.
 * @param {string} categoryData.cover_image - The cover_image of the category.
 * @param {string} categoryData.priority - The priority of the category.
 * @param {string} categoryData.featured - The featured of the category.
 *
 * @returns {Object} - The edited category with additional properties (id).
 * @throws {Error} - Throws an error if the category with the provided ID is not found.
 */

const edit = async (
  id,
  { name, slug, image, cover_image, priority, featured },
) => {
  const category = await Category.findById(id);
  if (!category) {
    throw notFound("Category not found.");
  }
  if (slug?.split(" ")?.length > 1) {
    slug = slugify(slug);
  }

  const payload = {
    name,
    slug,
    image,
    cover_image,
    priority,
    featured,
  };

  Object.keys(payload).forEach((key) => {
    category[key] = payload[key] ?? category[key];
  });

  await category.save();
  return { id: category.id, ...category._doc };
};

module.exports = edit;
