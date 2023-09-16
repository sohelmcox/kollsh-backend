const { State } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an state by its ID.
 *
 * @param {string} id - The ID of the state to be edited.
 * @param {Object} stateData - Data to create a new state.
 * @param {string} stateData.name - The name of the state.
 * @param {string} stateData.image - The image of the state.
 * @param {string} stateData.cities - The cities of the state.
 * @param {string} stateData.country - The cities of the state.
 * @param {string} stateData.priority - The cities of the state.
 *
 * @returns {Object} - The edited state with additional properties (id).
 * @throws {Error} - Throws an error if the state with the provided ID is not found.
 */

const edit = async (id, { name, image, cities, country, priority }) => {
  const state = await State.findById(id);
  if (!state) {
    throw notFound("State not found.");
  }

  const payload = {
    name,
    image,
    cities,
    country,
    priority,
  };

  Object.keys(payload).forEach((key) => {
    state[key] = payload[key] ?? state[key];
  });

  await state.save();
  return { ...state._doc, id: state.id };
};

module.exports = edit;
