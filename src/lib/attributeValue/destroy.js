const { AttributeValue } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an attributeValue by its ID.
 *
 * @param {string} id - The ID of the attributeValue to be deleted.
 * @throws {Error} - Throws an error if the attributeValue with the provided ID is not found.
 */
const destroy = async (id) => {
  const attributeValue = await AttributeValue.findById(id);
  if (!attributeValue) {
    throw notFound("attributeValue not found.");
  }
  await attributeValue.deleteOne();
};
module.exports = destroy;
