const { Metadata } = require("../../models");
/**
 * Destroy (delete) multiple metadata's by their IDs.
 *
 * @param {string[]} metadataIds - An array of IDs of the metadata's to be deleted.
 * @returns {number} - The number of deleted metadata's.
 * @throws {Error} - Throws an error if there was an issue while deleting metadata's.
 */
const destroyMany = async (metadataIds) => {
  try {
    const result = await Metadata.deleteMany({ _id: { $in: metadataIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting metadata's: ${error.message}`);
  }
};
module.exports = destroyMany;
