const { State } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Create a new state.
 *
 * @param {Object} stateData - Data to create a new state.
 * @param {string} stateData.name - The name of the state.
 * @param {string} stateData.image - The image of the state.
 * @param {string} stateData.cities - The cities of the state.
 * @param {string} stateData.country - The cities of the state.
 * @param {string} stateData.priority - The cities of the state.
 *
 * @returns {Object} - The newly created state with additional properties (id).
 */
const create = async ({ name, image, cities, country, priority }) => {
  const checkIsExist = await State.findOne({ name });
  if (checkIsExist) {
    throw badRequest("State already exist");
  }
  const stateData = {
    name,
    image,
    cities,
    country,
    priority,
  };
  const newState = new State(stateData);

  // Save the new state to the database
  await newState.save();

  return { ...newState._doc, id: newState.id };
};

module.exports = create;
