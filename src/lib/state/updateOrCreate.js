const { State } = require("../../models");

/**
 * Update or create an state by its ID.
 *
 * @param {string} id - The ID of the state to update. If it doesn't exist, a new state will be created.
 * @param {Object} stateData - Data to create a new state.
 * @param {string} stateData.name - The name of the state.
 * @param {string} stateData.image - The image of the state.
 * @param {string} stateData.cities - The cities of the state.
 * @param {string} stateData.country - The cities of the state.
 * @param {string} stateData.priority - The cities of the state.
 *
 * @returns {Object} - An object containing the updated state or newly created state and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (
  id,
  { name, image, cities, country, priority },
) => {
  const state = await State.findById(id);
  if (!state) {
    const newState = await State.create({
      name,
      image,
      cities,
      country,
      priority,
    });
    await newState.save();
    return {
      data: { ...newState._doc },
      code: 201,
    };
  }

  const payload = {
    name,
    image,
    cities,
    country,
    priority,
  };

  state.overwrite(payload);
  await state.save();

  return { data: { ...state._doc }, code: 200 };
};
module.exports = updateOrCreate;
