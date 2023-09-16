const { Country } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an country by its ID.
 *
 * @param {string} id - The ID of the country to be edited.
 * @param {Object} countryData - Data to create a new country.
 * @param {string} countryData.name - The name of the country.
 * @param {string} countryData.flag_image - The flag_image of the country.
 * @param {string} countryData.code - The code of the country.
 *
 * @returns {Object} - The edited country with additional properties (id).
 * @throws {Error} - Throws an error if the country with the provided ID is not found.
 */

const edit = async (id, { name, flag_image, code }) => {
  const country = await Country.findById(id);
  if (!country) {
    throw notFound("Country not found.");
  }

  const payload = {
    name,
    flag_image,
    code,
  };

  Object.keys(payload).forEach((key) => {
    country[key] = payload[key] ?? country[key];
  });

  await country.save();
  return { id: country.id, ...country._doc };
};

module.exports = edit;
