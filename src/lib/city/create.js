const { City } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Create a new city.
 *
 * @param {Object} cityData - Data to create a new city.
 * @param {string} cityData.name - The name of the city.
 * @param {string} cityData.state - The state of the city.
 * @param {string} cityData.priority - The cities of the city.
 *
 * @returns {Object} - The newly created city with additional properties (id).
 */
const create = async ({ name, state, priority }) => {
  const checkIsExist = await City.findOne({ name });
  if (checkIsExist) {
    throw badRequest("City already exist");
  }
  const cityData = {
    name,
    state,
    priority,
  };
  const newCity = new City(cityData);

  // Save the new city to the database
  await newCity.save();

  return { id: newCity.id, ...newCity._doc };
};

module.exports = create;
