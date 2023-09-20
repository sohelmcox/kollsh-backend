const { Reply } = require("../../models");

const { badRequest } = require("../../utils/error");

/**
 * Create a new reply.
 *
 * @param {Object} replyData - Data to create a new reply.
 * @param {string} replyData.content - The content of the reply.
 * @param {string} replyData.comment - The comment of the reply.
 * @param {string} replyData.user - The user of the reply creator.
 *
 * @returns {Object} - The newly created reply with additional properties (id).
 */
const create = async ({ content, comment, user }) => {
  const replyData = {
    content,
    comment,
    user,
  };
  const newReply = new Reply(replyData);

  // Save the new reply to the database
  await newReply.save();

  return { id: newReply.id, ...newReply._doc };
};

module.exports = create;
