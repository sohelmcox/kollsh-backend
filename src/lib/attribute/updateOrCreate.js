const { Attribute } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Update or create an attribute by its ID.
 *
 * @param {Object} attributeData - Data to create a new attribute.
 * @param {string} attributeData.name - The name of the attribute.
 * @param {string} attributeData.attribute_values - The attribute_values of the attribute.
 * @param {string} attributeData.subcategories - The subcategories of the attribute.
 * @param {string} attributeData.brands - The brands of the attribute.
 *
 * @returns {Object} - An object containing the updated attribute or newly created attribute and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (
  id,
  { name, attribute_values, subcategories, brands },
) => {
  const attribute = await Attribute.findById(id);
  if (!attribute) {
    const checkIsExist = await Attribute.findOne({ name });
    if (checkIsExist) {
      throw badRequest("Attribute name already exist");
    }

    const newAttribute = await Attribute.create({
      name,
      attribute_values,
      subcategories,
      brands,
    });
    await newAttribute.save();
    return {
      data: { ...newAttribute._doc },
      code: 201,
    };
  }
  const payload = {
    name,
    attribute_values,
    subcategories,
    brands,
  };

  attribute.overwrite(payload);
  await attribute.save();

  return { data: { ...attribute._doc }, code: 200 };
};
module.exports = updateOrCreate;
