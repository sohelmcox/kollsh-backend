const { ItemSuggestion } = require("../../models");

/**
 * Update or create an itemSuggestion by its ID.
 *
 * @param {Object} itemSuggestionData - Data to create a new itemSuggestion.
 * @param {string} itemSuggestionData.user - The user of the itemSuggestion.
 * @param {string} itemSuggestionData.item - The categories of the itemSuggestion.
 * @param {string} itemSuggestionData.subcategories - The subcategories of the itemSuggestion.
 * @param {string} itemSuggestionData.brands - The brands of the itemSuggestion.
 *
 * @returns {Object} - An object containing the updated itemSuggestion or newly created itemSuggestion and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (id, { user, item, subcategories, brands }) => {
  const itemSuggestion = await ItemSuggestion.findById(id);
  if (!itemSuggestion) {
    const newItemSuggestion = await ItemSuggestion.create({
      user,
      item,
      subcategories,
      brands,
    });
    await newItemSuggestion.save();
    return {
      data: { ...newItemSuggestion._doc },
      code: 201,
    };
  }

  const payload = {
    user,
    item,
    subcategories,
    brands,
  };

  itemSuggestion.overwrite(payload);
  await itemSuggestion.save();

  return { data: { ...itemSuggestion._doc }, code: 200 };
};
module.exports = updateOrCreate;
