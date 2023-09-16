const { Subcategory } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an subcategory by its ID.
 *
 * @param {string} id - The ID of the subcategory to be deleted.
 * @throws {Error} - Throws an error if the subcategory with the provided ID is not found.
 */
const destroy = async (id) => {
  const subcategory = await Subcategory.findById(id);
  if (!subcategory) {
    throw notFound("Subcategory not found.");
  }
  await subcategory.deleteOne();
};
module.exports = destroy;
