const { Comment } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an comment by its ID.
 *
 * @param {Object} commentData - Data to create a new comment.
 * @param {string} commentData.content - The content of the comment.
 * @param {string} commentData.itemDetails - The itemDetailsID of the comment.
 *
 * @returns {Object} - The edited comment with additional properties (id).
 * @throws {Error} - Throws an error if the comment with the provided ID is not found.
 */

const edit = async (id, { content, itemDetails }) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw notFound("Comment not found.");
  }

  const payload = {
    content,
    itemDetails,
  };

  Object.keys(payload).forEach((key) => {
    comment[key] = payload[key] ?? comment[key];
  });

  await comment.save();
  return { id: comment.id, ...comment._doc };
};

module.exports = edit;
