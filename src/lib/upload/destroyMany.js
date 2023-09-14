const { Upload } = require("../../models");
/**
 * Destroy (delete) multiple items by their IDs.
 *
 * @param {string[]} itemIds - An array of IDs of the items to be deleted.
 * @returns {number} - The number of deleted items.
 * @throws {Error} - Throws an error if there was an issue while deleting items.
 */
const destroyMany = async (itemIds) => {
  try {
    const result = await Upload.deleteMany({ _id: { $in: itemIds } });
    return result.deletedCount; // Return the number of deleted items
    // TODO:
    // Asynchronously delete all item details and images
  } catch (error) {
    throw new Error(`Error deleting items: ${error.message}`);
  }
};
module.exports = destroyMany;
