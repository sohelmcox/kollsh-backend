const { Subcategory } = require("../../models");
const { notFound } = require("../../utils/error");
const { slugify } = require("../../utils/generateUniqueSlug");
/**
 * Edit (update) an subcategory by its ID.
 *
 * @param {Object} subcategoryData - Data to create a new subcategory.
 * @param {string} subcategoryData.name - The name of the subcategory.
 * @param {string} subcategoryData.category - The category of the subcategory.
 * @param {string} subcategoryData.image - The image of the subcategory.
 * @param {string} subcategoryData.cover_image - The cover_image of the subcategory.
 * @param {string} subcategoryData.priority - The subcategories of the subcategory.
 * @param {string} subcategoryData.is_brand - The is_brand of the subcategory.
 *
 * @returns {Object} - The edited subcategory with additional properties (id).
 * @throws {Error} - Throws an error if the subcategory with the provided ID is not found.
 */

const edit = async (
  id,
  { name, slug, category, image, cover_image, priority, is_brand },
) => {
  const subcategory = await Subcategory.findById(id);
  if (!subcategory) {
    throw notFound("Subcategory not found.");
  }
  if (slug?.split(" ")?.length > 1) {
    slug = slugify(slug);
  }
  const payload = {
    name,
    slug,
    category,
    image,
    cover_image,
    priority,
    is_brand,
  };

  Object.keys(payload).forEach((key) => {
    subcategory[key] = payload[key] ?? subcategory[key];
  });

  await subcategory.save();
  return { id: subcategory.id, ...subcategory._doc };
};

module.exports = edit;
