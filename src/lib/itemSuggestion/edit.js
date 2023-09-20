const { ItemSuggestion } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an itemSuggestion by its ID.
 *
 * @param {Object} itemSuggestionData - Data to create a new itemSuggestion.
 * @param {string} itemSuggestionData.user - The user of the itemSuggestion.
 * @param {string} itemSuggestionData.categories - The categories of the itemSuggestion.
 * @param {string} itemSuggestionData.subcategories - The subcategories of the itemSuggestion.
 * @param {string} itemSuggestionData.brands - The brands of the itemSuggestion.
 *
 * @returns {Object} - The edited itemSuggestion with additional properties (id).
 * @throws {Error} - Throws an error if the itemSuggestion with the provided ID is not found.
 */

const edit = async (id, { user, item, subcategories, brands }) => {
  const itemSuggestion = await ItemSuggestion.findById(id);
  if (!itemSuggestion) {
    throw notFound("ItemSuggestion not found.");
  }

  const payload = {
    user,
    item,
    subcategories,
    brands,
  };

  Object.keys(payload).forEach((key) => {
    itemSuggestion[key] = payload[key] ?? itemSuggestion[key];
  });

  await itemSuggestion.save();
  return { id: itemSuggestion.id, ...itemSuggestion._doc };
};

module.exports = edit;
