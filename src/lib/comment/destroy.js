const { Comment } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an comment by its ID.
 *
 * @param {string} id - The ID of the comment to be deleted.
 * @throws {Error} - Throws an error if the comment with the provided ID is not found.
 */
const destroy = async (id) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw notFound("Comment not found.");
  }
  // TODO:
  // Asynchronously delete all reply

  await comment.deleteOne();
};
module.exports = destroy;
