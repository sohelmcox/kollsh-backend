const { Category } = require("../../models");
/**
 * Destroy (delete) multiple categories by their IDs.
 *
 * @param {string[]} categoryIds - An array of IDs of the categories to be deleted.
 * @returns {number} - The number of deleted categories.
 * @throws {Error} - Throws an error if there was an issue while deleting categories.
 */
const destroyMany = async (categoryIds) => {
  try {
    const result = await Category.deleteMany({ _id: { $in: categoryIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting categories: ${error.message}`);
  }
};
module.exports = destroyMany;
