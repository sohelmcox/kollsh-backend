const { Country } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Update or create an country by its ID.
 *
 * @param {string} id - The ID of the country to update. If it doesn't exist, a new country will be created.
 * @param {Object} countryData - Data to create a new country.
 * @param {string} countryData.name - The name of the country.
 * @param {string} countryData.flag_image - The flag_image of the country.
 * @param {string} countryData.code - The code of the country.
 *
 * @returns {Object} - An object containing the updated country or newly created country and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (id, { name, flag_image, code }) => {
  const country = await Country.findById(id);
  if (!country) {
    const checkIsExist = await Country.findOne({ name });
    if (checkIsExist) {
      throw badRequest("Country already exist");
    }
    const newCountry = await Country.create({
      name,
      flag_image,
      code,
    });
    await newCountry.save();
    return {
      data: { ...newCountry._doc },
      code: 201,
    };
  }

  const payload = {
    name,
    flag_image,
    code,
  };

  country.overwrite(payload);
  await country.save();

  return { data: { ...country._doc }, code: 200 };
};
module.exports = updateOrCreate;
