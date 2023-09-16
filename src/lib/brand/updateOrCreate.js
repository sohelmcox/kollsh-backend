const { Brand } = require("../../models");
const { badRequest } = require("../../utils/error");
const { slugify } = require("../../utils/generateUniqueSlug");

/**
 * Update or create an brand by its ID.
 *
 * @param {Object} brandData - Data to create a new brand.
 * @param {string} brandData.name - The name of the brand.
 * @param {string} brandData.image - The image of the brand.
 * @param {string} brandData.description - The description of the brand.
 * @param {string} brandData.priority - The brands of the brand.
 *
 * @returns {Object} - An object containing the updated brand or newly created brand and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (id, { name, image, description, priority }) => {
  const brand = await Brand.findById(id);
  if (!brand) {
    const checkIsExist = await Brand.findOne({ name });
    if (checkIsExist) {
      throw badRequest("Brand name already exist");
    }
    const uniqueSlug = await slugify(name);

    const newBrand = await Brand.create({
      name,
      slug: uniqueSlug,
      image,
      description,
      priority,
    });
    await newBrand.save();
    return {
      data: { ...newBrand._doc },
      code: 201,
    };
  }

  const uniqueSlug = await slugify(name);
  const payload = {
    name,
    slug: uniqueSlug,
    image,
    description,
    priority,
  };

  brand.overwrite(payload);
  await brand.save();

  return { data: { ...brand._doc }, code: 200 };
};
module.exports = updateOrCreate;
