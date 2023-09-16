const { Country } = require("../../models");
/**
 * Destroy (delete) multiple countries by their IDs.
 *
 * @param {string[]} countryIds - An array of IDs of the countries to be deleted.
 * @returns {number} - The number of deleted countries.
 * @throws {Error} - Throws an error if there was an issue while deleting countries.
 */
const destroyMany = async (countryIds) => {
  try {
    const result = await Country.deleteMany({ _id: { $in: countryIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting countries: ${error.message}`);
  }
};
module.exports = destroyMany;
