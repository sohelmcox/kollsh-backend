const { AttributeValue } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Update or create an attributeValue by its ID.
 *
 * @param {Object} attributeValueData - Data to create a new attributeValue.
 * @param {string} attributeValueData.name - The name of the attributeValue.
 * @param {string} attributeValueData.color_code - The color_code of the attributeValue.
 * @param {string} attributeValueData.attribute - The attribute of the attributeValue.
 * @param {string} attributeValueData.value - The value of the attributeValue.
 * @param {string} attributeValueData.brands - The brands of the attributeValue.
 *
 * @returns {Object} - An object containing the updated attributeValue or newly created attributeValue and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (
  id,
  { name, color_code, attribute, value, brands },
) => {
  const attributeValue = await AttributeValue.findById(id);
  if (!attributeValue) {
    const checkIsExist = await AttributeValue.findOne({ name });
    if (checkIsExist) {
      throw badRequest("AttributeValue name already exist");
    }
    const newAttributeValue = await AttributeValue.create({
      name,
      color_code,
      attribute,
      value,
      brands,
    });
    await newAttributeValue.save();
    return {
      data: { ...newAttributeValue._doc },
      code: 201,
    };
  }
  const payload = {
    name,
    color_code,
    attribute,
    value,
    brands,
  };

  attributeValue.overwrite(payload);
  await attributeValue.save();

  return { data: { ...attributeValue._doc }, code: 200 };
};
module.exports = updateOrCreate;
