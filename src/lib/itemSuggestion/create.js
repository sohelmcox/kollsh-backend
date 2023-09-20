const { ItemSuggestion } = require("../../models");

/**
 * Create a new itemSuggestion.
 *
 * @param {Object} itemSuggestionData - Data to create a new itemSuggestion.
 * @param {string} itemSuggestionData.user - The user of the itemSuggestion.
 * @param {string} itemSuggestionData.item - The item of the itemSuggestion.
 * @param {string} itemSuggestionData.subcategories - The subcategories of the itemSuggestion.
 * @param {string} itemSuggestionData.brands - The brands of the itemSuggestion.
 *
 * @returns {Object} - The newly created itemSuggestion with additional properties (id).
 */
const create = async ({ user, item, subcategories, brands }) => {
  const itemSuggestionData = {
    user,
    item,
    subcategories,
    brands,
  };
  const newItemSuggestion = new ItemSuggestion(itemSuggestionData);

  // Save the new itemSuggestion to the database
  await newItemSuggestion.save();

  return { id: newItemSuggestion.id, ...newItemSuggestion._doc };
};

module.exports = create;
