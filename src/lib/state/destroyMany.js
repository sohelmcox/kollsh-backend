const { State } = require("../../models");
/**
 * Destroy (delete) multiple states by their IDs.
 *
 * @param {string[]} stateIds - An array of IDs of the states to be deleted.
 * @returns {number} - The number of deleted states.
 * @throws {Error} - Throws an error if there was an issue while deleting states.
 */
const destroyMany = async (stateIds) => {
  try {
    const result = await State.deleteMany({ _id: { $in: stateIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting states: ${error.message}`);
  }
};
module.exports = destroyMany;
