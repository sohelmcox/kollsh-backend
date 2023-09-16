const { Country } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an country by its ID.
 *
 * @param {string} id - The ID of the country to be deleted.
 * @throws {Error} - Throws an error if the country with the provided ID is not found.
 */
const destroy = async (id) => {
  const country = await Country.findById(id);
  if (!country) {
    throw notFound("Country not found.");
  }
  await country.deleteOne();
};
module.exports = destroy;
