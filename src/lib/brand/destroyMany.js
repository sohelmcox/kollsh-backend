const { Brand } = require("../../models");
/**
 * Destroy (delete) multiple brands by their IDs.
 *
 * @param {string[]} brandIds - An array of IDs of the brands to be deleted.
 * @returns {number} - The number of deleted brands.
 * @throws {Error} - Throws an error if there was an issue while deleting brands.
 */
const destroyMany = async (brandIds) => {
  try {
    const result = await Brand.deleteMany({ _id: { $in: brandIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting brands: ${error.message}`);
  }
};
module.exports = destroyMany;
