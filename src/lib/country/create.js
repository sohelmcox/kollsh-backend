const { Country } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Create a new country.
 *
 * @param {Object} countryData - Data to create a new country.
 * @param {string} countryData.name - The name of the country.
 * @param {string} countryData.flag_image - The flag_image of the country.
 * @param {string} countryData.code - The code of the country.
 *
 * @returns {Object} - The newly created country with additional properties (id).
 */
const create = async ({ name, flag_image, code }) => {
  const checkIsExist = await Country.findOne({ name });
  if (checkIsExist) {
    throw badRequest("Country already exist");
  }
  const countryData = {
    name,
    flag_image,
    code,
  };
  const newCountry = new Country(countryData);

  // Save the new country to the database
  await newCountry.save();

  return { id: newCountry.id, ...newCountry._doc };
};

module.exports = create;
