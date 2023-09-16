const { Brand } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an brand by its ID.
 *
 * @param {Object} brandData - Data to create a new brand.
 * @param {string} brandData.name - The name of the brand.
 * @param {string} brandData.image - The image of the brand.
 * @param {string} brandData.description - The description of the brand.
 * @param {string} brandData.priority - The brands of the brand.
 *
 * @returns {Object} - The edited brand with additional properties (id).
 * @throws {Error} - Throws an error if the brand with the provided ID is not found.
 */

const edit = async (id, { name, image, description, priority }) => {
  const brand = await Brand.findById(id);
  if (!brand) {
    throw notFound("Brand not found.");
  }

  const payload = {
    name,
    image,
    description,
    priority,
  };

  Object.keys(payload).forEach((key) => {
    brand[key] = payload[key] ?? brand[key];
  });

  await brand.save();
  return { id: brand.id, ...brand._doc };
};

module.exports = edit;
