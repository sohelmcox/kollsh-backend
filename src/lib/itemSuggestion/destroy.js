const { ItemSuggestion } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an itemSuggestion by its ID.
 *
 * @param {string} id - The ID of the itemSuggestion to be deleted.
 * @throws {Error} - Throws an error if the itemSuggestion with the provided ID is not found.
 */
const destroy = async (id) => {
  const itemSuggestion = await ItemSuggestion.findById(id);
  if (!itemSuggestion) {
    throw notFound("itemSuggestion not found.");
  }
  await itemSuggestion.deleteOne();
};
module.exports = destroy;
