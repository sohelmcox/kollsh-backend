const { Comment } = require("../../models");

/**
 * Create a new comment.
 *
 * @param {Object} commentData - Data to create a new comment.
 * @param {string} commentData.content - The content of the comment.
 * @param {string} commentData.itemDetails - The itemDetailsID of the comment.
 * @param {string} commentData.author - The user who created the comment.
 *
 * @returns {Object} - The newly created comment with additional properties (id).
 */

const create = async ({ content, author, itemDetails }) => {
  const commentData = {
    content,
    itemDetails,
    author,
  };
  const newComment = new Comment(commentData);

  // Save the new comment to the database
  await newComment.save();

  return { id: newComment.id, ...newComment._doc };
};

module.exports = create;
