const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Country } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single country based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the country to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The country data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let country = await Country.findById(id);
  if (!country) {
    throw notFound("Country not found");
  }

  // Apply population
  if (populatedFields.length > 0) {
    country = await getSinglePopulatedFields(country, populatedFields);
    // country = await country.populate(populatedFields.join(" "));
  }
  // return { id: country.id, ...country._doc };
  return country;
};
module.exports = findSingle;
