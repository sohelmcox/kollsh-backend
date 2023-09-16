const { City } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an city by its ID.
 *
 * @param {string} id - The ID of the city to be deleted.
 * @throws {Error} - Throws an error if the city with the provided ID is not found.
 */
const destroy = async (id) => {
  const city = await City.findById(id);
  if (!city) {
    throw notFound("City not found.");
  }
  await city.deleteOne();
};
module.exports = destroy;
