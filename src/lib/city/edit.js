const { City } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an city by its ID.
 *
 * @param {string} id - The ID of the city to be edited.
 * @param {Object} cityData - Data to create a new city.
 * @param {string} cityData.name - The name of the city.
 * @param {string} cityData.city - The city of the city.
 * @param {string} cityData.priority - The cities of the city.
 *
 * @returns {Object} - The edited city with additional properties (id).
 * @throws {Error} - Throws an error if the city with the provided ID is not found.
 */

const edit = async (id, { name, state, priority }) => {
  const city = await City.findById(id);
  if (!city) {
    throw notFound("City not found.");
  }

  const payload = {
    name,
    state,
    priority,
  };

  Object.keys(payload).forEach((key) => {
    city[key] = payload[key] ?? city[key];
  });

  await city.save();
  return { id: city.id, ...city._doc };
};

module.exports = edit;
