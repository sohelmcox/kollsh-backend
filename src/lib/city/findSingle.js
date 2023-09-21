const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { City } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single city based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the city to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The city data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let city = await City.findById(id);
  if (!city) {
    throw notFound("City not found");
  }

  // Apply population
  if (populatedFields.length > 0) {
    city = await getSinglePopulatedFields(city, populatedFields);
    // city = await city.populate(populatedFields.join(" "));
  }
  // return { id: city.id, ...city._doc };
  return city;
};
module.exports = findSingle;
