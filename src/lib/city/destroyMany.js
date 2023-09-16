const { City } = require("../../models");
/**
 * Destroy (delete) multiple cities by their IDs.
 *
 * @param {string[]} cityIds - An array of IDs of the cities to be deleted.
 * @returns {number} - The number of deleted cities.
 * @throws {Error} - Throws an error if there was an issue while deleting cities.
 */
const destroyMany = async (cityIds) => {
  try {
    const result = await City.deleteMany({ _id: { $in: cityIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting cities: ${error.message}`);
  }
};
module.exports = destroyMany;
