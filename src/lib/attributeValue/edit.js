const { AttributeValue } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an attributeValue by its ID.
 *
 * @param {Object} attributeValueData - Data to create a new attributeValue.
 * @param {string} attributeValueData.name - The name of the attributeValue.
 * @param {string} attributeValueData.color_code - The color_code of the attributeValue.
 * @param {string} attributeValueData.attribute - The attribute of the attributeValue.
 * @param {string} attributeValueData.value - The value of the attributeValue.
 * @param {string} attributeValueData.brands - The brands of the attributeValue.
 *
 * @returns {Object} - The edited attributeValue with additional properties (id).
 * @throws {Error} - Throws an error if the attributeValue with the provided ID is not found.
 */

const edit = async (id, { name, color_code, attribute, value, brands }) => {
  const attributeValue = await AttributeValue.findById(id);
  if (!attributeValue) {
    throw notFound("AttributeValue not found.");
  }
  const payload = {
    name,
    color_code,
    attribute,
    value,
    brands,
  };

  Object.keys(payload).forEach((key) => {
    attributeValue[key] = payload[key] ?? attributeValue[key];
  });

  await attributeValue.save();
  return { id: attributeValue.id, ...attributeValue._doc };
};

module.exports = edit;
