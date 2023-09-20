const { ItemSuggestion } = require("../../models");
/**
 * Destroy (delete) multiple itemSuggestions by their IDs.
 *
 * @param {string[]} itemSuggestionIds - An array of IDs of the itemSuggestions to be deleted.
 * @returns {number} - The number of deleted itemSuggestions.
 * @throws {Error} - Throws an error if there was an issue while deleting itemSuggestions.
 */
const destroyMany = async (itemSuggestionIds) => {
  try {
    const result = await ItemSuggestion.deleteMany({
      _id: { $in: itemSuggestionIds },
    });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting itemSuggestions: ${error.message}`);
  }
};
module.exports = destroyMany;
