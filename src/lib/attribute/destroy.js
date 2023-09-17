const { Attribute } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an attribute by its ID.
 *
 * @param {string} id - The ID of the attribute to be deleted.
 * @throws {Error} - Throws an error if the attribute with the provided ID is not found.
 */
const destroy = async (id) => {
  const attribute = await Attribute.findById(id);
  if (!attribute) {
    throw notFound("attribute not found.");
  }
  await attribute.deleteOne();
};
module.exports = destroy;
