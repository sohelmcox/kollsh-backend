const { Reply } = require("../../models");
/**
 * Destroy (delete) multiple replies by their IDs.
 *
 * @param {string[]} replyIds - An array of IDs of the replies to be deleted.
 * @returns {number} - The number of deleted replies.
 * @throws {Error} - Throws an error if there was an issue while deleting replies.
 */
const destroyMany = async (replyIds) => {
  try {
    const result = await Reply.deleteMany({ _id: { $in: replyIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting replies: ${error.message}`);
  }
};
module.exports = destroyMany;
