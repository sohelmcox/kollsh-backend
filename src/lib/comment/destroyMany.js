const { Comment } = require("../../models");
/**
 * Destroy (delete) multiple comments by their IDs.
 *
 * @param {string[]} commentIds - An array of IDs of the comments to be deleted.
 * @returns {number} - The number of deleted comments.
 * @throws {Error} - Throws an error if there was an issue while deleting comments.
 */
const destroyMany = async (commentIds) => {
  try {
    const result = await Comment.deleteMany({ _id: { $in: commentIds } });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting comments: ${error.message}`);
  }
};
module.exports = destroyMany;
