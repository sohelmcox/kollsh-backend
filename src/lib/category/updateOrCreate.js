const { Category } = require("../../models");
const { badRequest } = require("../../utils/error");
const { slugify } = require("../../utils/generateUniqueSlug");

/**
 * Update or create an category by its ID.
 *
 * @param {Object} categoryData - Data to create a new category.
 * @param {string} categoryData.name - The name of the category.
 * @param {string} categoryData.image - The image of the category.
 * @param {string} categoryData.cover_image - The cover_image of the category.
 * @param {string} categoryData.priority - The priority of the category.
 * @param {string} categoryData.featured - The featured of the category.
 *
 * @returns {Object} - An object containing the updated category or newly created category and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (
  id,
  { name, image, cover_image, priority, featured },
) => {
  const category = await Category.findById(id);
  const uniqueSlug = slugify(name);
  if (!category) {
    const checkIsExist = await Category.findOne({ name });
    if (checkIsExist) {
      throw badRequest("Category name already exist");
    }

    const newCategory = await Category.create({
      name,
      slug: uniqueSlug,
      image,
      cover_image,
      priority,
      featured,
    });
    await newCategory.save();
    return {
      data: { ...newCategory._doc },
      code: 201,
    };
  }

  const payload = {
    name,
    slug: uniqueSlug,
    image,
    cover_image,
    priority,
    featured,
  };

  category.overwrite(payload);
  await category.save();

  return { data: { ...category._doc }, code: 200 };
};
module.exports = updateOrCreate;
