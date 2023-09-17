const { Attribute } = require("../../models");
const { notFound } = require("../../utils/error");

/**
 * Edit (update) an attribute by its ID.
 *
 * @param {Object} attributeData - Data to create a new attribute.
 * @param {string} attributeData.name - The name of the attribute.
 * @param {string} attributeData.attribute_values - The attribute_values of the attribute.
 * @param {string} attributeData.subcategories - The subcategories of the attribute.
 * @param {string} attributeData.brands - The brands of the attribute.
 *
 * @returns {Object} - The edited attribute with additional properties (id).
 * @throws {Error} - Throws an error if the attribute with the provided ID is not found.
 */

const edit = async (id, { name, attribute_values, subcategories, brands }) => {
  const attribute = await Attribute.findById(id);
  if (!attribute) {
    throw notFound("Attribute not found.");
  }

  const payload = {
    name,
    attribute_values,
    subcategories,
    brands,
  };

  Object.keys(payload).forEach((key) => {
    attribute[key] = payload[key] ?? attribute[key];
  });

  await attribute.save();
  return { id: attribute.id, ...attribute._doc };
};

module.exports = edit;
