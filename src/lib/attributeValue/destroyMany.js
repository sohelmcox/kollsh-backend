const { AttributeValue } = require("../../models");
/**
 * Destroy (delete) multiple attributeValues by their IDs.
 *
 * @param {string[]} attributeValueIds - An array of IDs of the attributeValues to be deleted.
 * @returns {number} - The number of deleted attributeValues.
 * @throws {Error} - Throws an error if there was an issue while deleting attributeValues.
 */
const destroyMany = async (attributeValueIds) => {
  try {
    const result = await AttributeValue.deleteMany({
      _id: { $in: attributeValueIds },
    });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting attributeValues: ${error.message}`);
  }
};
module.exports = destroyMany;
