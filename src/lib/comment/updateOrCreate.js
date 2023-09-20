const { Comment } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Update or create an comment by its ID.
 *
 * @param {Object} commentData - Data to create a new comment.
 * @param {string} commentData.content - The content of the comment.
 * @param {string} commentData.itemDetails - The itemDetailsID of the comment.
 *
 * @returns {Object} - An object containing the updated comment or newly created comment and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (id, { content, itemDetails }) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    const newComment = await Comment.create({
      content,
      itemDetails,
    });
    await newComment.save();
    return {
      data: { ...newComment._doc },
      code: 201,
    };
  }

  const payload = {
    content,
    itemDetails,
  };

  comment.overwrite(payload);
  await comment.save();

  return { data: { ...comment._doc }, code: 200 };
};
module.exports = updateOrCreate;
