const { State } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an state by its ID.
 *
 * @param {string} id - The ID of the state to be deleted.
 * @throws {Error} - Throws an error if the state with the provided ID is not found.
 */
const destroy = async (id) => {
  const state = await State.findById(id);
  if (!state) {
    throw notFound("State not found.");
  }
  await state.deleteOne();
};
module.exports = destroy;
