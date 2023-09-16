const { Brand } = require("../../models");
const { generateUniqueSlug } = require("../../utils");
const { badRequest } = require("../../utils/error");
const { slugify } = require("../../utils/generateUniqueSlug");

/**
 * Create a new brand.
 *
 * @param {Object} brandData - Data to create a new brand.
 * @param {string} brandData.name - The name of the brand.
 * @param {string} brandData.image - The image of the brand.
 * @param {string} brandData.description - The description of the brand.
 * @param {string} brandData.priority - The brands of the brand.
 *
 * @returns {Object} - The newly created brand with additional properties (id).
 */
const create = async ({ name, image, description, priority }) => {
  const checkIsExist = await Brand.findOne({ name });
  if (checkIsExist) {
    throw badRequest("Brand already exist");
  }
  const uniqueSlug = await slugify(name);

  const brandData = {
    name,
    slug: uniqueSlug,
    image,
    description,
    priority,
  };
  const newBrand = new Brand(brandData);

  // Save the new brand to the database
  await newBrand.save();

  return { id: newBrand.id, ...newBrand._doc };
};

module.exports = create;
