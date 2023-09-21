const { City } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Update or create an city by its ID.
 *
 * @param {string} id - The ID of the city to update. If it doesn't exist, a new city will be created.
 * @param {Object} cityData - Data to create a new city.
 * @param {string} cityData.name - The name of the city.
 * @param {string} cityData.city - The city of the city.
 * @param {string} cityData.priority - The cities of the city.
 *
 * @returns {Object} - An object containing the updated city or newly created city and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (id, { name, state, priority }) => {
  const city = await City.findById(id);
  if (!city) {
    const checkIsExist = await City.findOne({ name });
    if (checkIsExist) {
      throw badRequest("City name already exist");
    }
    const newCity = await City.create({
      name,
      state,
      priority,
    });
    await newCity.save();
    return {
      data: { ...newCity._doc },
      code: 201,
    };
  }

  const payload = {
    name,
    state,
    priority,
  };

  city.overwrite(payload);
  await city.save();

  return { data: { ...city._doc }, code: 200 };
};
module.exports = updateOrCreate;
