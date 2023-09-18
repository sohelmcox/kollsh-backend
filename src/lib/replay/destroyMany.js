const { Replay } = require("../../models");
/**
 * Destroy (delete) multiple replays by their IDs.
 *
 * @param {string[]} replayIds - An array of IDs of the replays to be deleted.
 * @returns {number} - The number of deleted replays.
 * @throws {Error} - Throws an error if there was an issue while deleting replays.
 */
const destroyMany = async (replayIds) => {
  try {
    const result = await Replay.deleteMany({ _id: { $in: replayIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting replays: ${error.message}`);
  }
};
module.exports = destroyMany;
