const { AttributeValue } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Create a new attributeValue.
 *
 * @param {Object} attributeValueData - Data to create a new attributeValue.
 * @param {string} attributeValueData.name - The name of the attributeValue.
 * @param {string} attributeValueData.color_code - The color_code of the attributeValue.
 * @param {string} attributeValueData.attribute - The attribute of the attributeValue.
 * @param {string} attributeValueData.value - The value of the attributeValue.
 * @param {string} attributeValueData.brands - The brands of the attributeValue.
 *
 * @returns {Object} - The newly created attributeValue with additional properties (id).
 */
const create = async ({ name, color_code, attribute, value, brands }) => {
  const checkIsExist = await AttributeValue.findOne({ name });
  if (checkIsExist) {
    throw badRequest("AttributeValue already exist");
  }

  const attributeValueData = {
    name,
    color_code,
    attribute,
    value,
    brands,
  };
  const newAttributeValue = new AttributeValue(attributeValueData);

  // Save the new attributeValue to the database
  await newAttributeValue.save();

  return { id: newAttributeValue.id, ...newAttributeValue._doc };
};

module.exports = create;
