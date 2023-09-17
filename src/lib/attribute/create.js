const { Attribute } = require("../../models");
const { badRequest } = require("../../utils/error");
const { slugify } = require("../../utils/generateUniqueSlug");

/**
 * Create a new attribute.
 *
 * @param {Object} attributeData - Data to create a new attribute.
 * @param {string} attributeData.name - The name of the attribute.
 * @param {string} attributeData.attribute_values - The attribute_values of the attribute.
 * @param {string} attributeData.subcategories - The subcategories of the attribute.
 * @param {string} attributeData.brands - The brands of the attribute.
 *
 * @returns {Object} - The newly created attribute with additional properties (id).
 */
const create = async ({ name, attribute_values, subcategories, brands }) => {
  const checkIsExist = await Attribute.findOne({ name });
  if (checkIsExist) {
    throw badRequest("Attribute already exist");
  }

  const attributeData = {
    name,
    attribute_values,
    subcategories,
    brands,
  };
  const newAttribute = new Attribute(attributeData);

  // Save the new attribute to the database
  await newAttribute.save();

  return { id: newAttribute.id, ...newAttribute._doc };
};

module.exports = create;
