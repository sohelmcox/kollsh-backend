const { Attribute } = require("../../models");
/**
 * Destroy (delete) multiple attributes by their IDs.
 *
 * @param {string[]} attributeIds - An array of IDs of the attributes to be deleted.
 * @returns {number} - The number of deleted attributes.
 * @throws {Error} - Throws an error if there was an issue while deleting attributes.
 */
const destroyMany = async (attributeIds) => {
  try {
    const result = await Attribute.deleteMany({ _id: { $in: attributeIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting attributes: ${error.message}`);
  }
};
module.exports = destroyMany;
