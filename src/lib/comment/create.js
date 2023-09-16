const { Comment } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Create a new comment.
 *
 * @param {Object} commentData - Data to create a new comment.
 * @param {string} commentData.content - The content of the comment.
 * @param {string} commentData.item - The itemID of the comment.
 * @param {string} commentData.author - The user who created the comment.
 *
 * @returns {Object} - The newly created comment with additional properties (id).
 */
// TODO: change item to ItemId
const create = async ({ content, author, item }) => {
  const commentData = {
    content,
    item,
    author,
  };
  const newComment = new Comment(commentData);

  // Save the new comment to the database
  await newComment.save();

  return { id: newComment.id, ...newComment._doc };
};

module.exports = create;
