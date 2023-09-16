const { Subcategory } = require("../../models");
/**
 * Destroy (delete) multiple subcategories by their IDs.
 *
 * @param {string[]} subcategoryIds - An array of IDs of the subcategories to be deleted.
 * @returns {number} - The number of deleted subcategories.
 * @throws {Error} - Throws an error if there was an issue while deleting subcategories.
 */
const destroyMany = async (subcategoryIds) => {
  try {
    const result = await Subcategory.deleteMany({
      _id: { $in: subcategoryIds },
    });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting subcategories: ${error.message}`);
  }
};
module.exports = destroyMany;
