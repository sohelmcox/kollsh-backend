const { Subcategory } = require("../../models");
const { badRequest } = require("../../utils/error");
const { slugify } = require("../../utils/generateUniqueSlug");

/**
 * Update or create an subcategory by its ID.
 *
 * @param {Object} subcategoryData - Data to create a new subcategory.
 * @param {string} subcategoryData.name - The name of the subcategory.
 * @param {string} subcategoryData.category - The category of the subcategory.
 * @param {string} subcategoryData.image - The image of the subcategory.
 * @param {string} subcategoryData.cover_image - The cover_image of the subcategory.
 * @param {string} subcategoryData.priority - The subcategories of the subcategory.
 * @param {string} subcategoryData.is_brand - The is_brand of the subcategory.
 *
 * @returns {Object} - An object containing the updated subcategory or newly created subcategory and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (
  id,
  { name, category, image, cover_image, priority, is_brand },
) => {
  const subcategory = await Subcategory.findById(id);
  if (!subcategory) {
    const checkIsExist = await Subcategory.findOne({ name });
    if (checkIsExist) {
      throw badRequest("Subcategory name already exist");
    }
    const uniqueSlug = await slugify(name);

    const newSubcategory = await Subcategory.create({
      name,
      slug: uniqueSlug,
      category,
      image,
      cover_image,
      priority,
      is_brand,
    });
    await newSubcategory.save();
    return {
      id: newSubcategory.id,
      data: { ...newSubcategory._doc },
      code: 201,
    };
  }

  const uniqueSlug = await slugify(name);
  const payload = {
    name,
    slug: uniqueSlug,
    category,
    image,
    cover_image,
    priority,
    is_brand,
  };

  subcategory.overwrite(payload);
  await subcategory.save();

  return { id: subcategory.id, data: { ...subcategory._doc }, code: 200 };
};
module.exports = updateOrCreate;
