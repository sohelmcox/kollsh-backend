const { Category } = require("../../models");
const { badRequest } = require("../../utils/error");
const { slugify } = require("../../utils/generateUniqueSlug");
const { create: createMetadata } = require("../metadata");

/**
 * Create a new category.
 *
 * @param {Object} categoryData - Data to create a new category.
 * @param {string} categoryData.name - The name of the category.
 * @param {string} categoryData.image - The image of the category.
 * @param {string} categoryData.cover_image - The cover_image of the category.
 * @param {string} categoryData.priority - The priority of the category.
 * @param {string} categoryData.featured - The featured of the category.
 *
 * @returns {Object} - The newly created category with additional properties (id).
 */
const create = async ({ name, image, cover_image, priority, featured }) => {
  const checkIsExist = await Category.findOne({ name });
  if (checkIsExist) {
    throw badRequest("Category already exist");
  }
  const uniqueSlug = await slugify(name);
  const metadataObject = {
    title: name,
    description: name,
    image,
    keywords: name.split(" "),
  };
  // create metadata
  const newMetadata = await createMetadata({ ...metadataObject });
  const categoryData = {
    name,
    slug: uniqueSlug,
    image,
    cover_image,
    priority,
    featured,
    metadata: newMetadata.id,
  };
  const newCategory = new Category(categoryData);

  // Save the new category to the database
  await newCategory.save();

  return { id: newCategory.id, ...newCategory._doc };
};

module.exports = create;
