const { Reply } = require("../../models");
const { notFound } = require("../../utils/error");
const { slugify } = require("../../utils/generateUniqueSlug");
/**
 * Edit (update) an reply by its ID.
 *
 * @param {Object} replyData - Data to create a new reply.
 * @param {string} replyData.content - The content of the reply.
 * @param {string} replyData.comment - The comment of the reply.
 *
 * @returns {Object} - The edited reply with additional properties (id).
 * @throws {Error} - Throws an error if the reply with the provided ID is not found.
 */

const edit = async (id, { content }) => {
  const reply = await Reply.findById(id);
  if (!reply) {
    throw notFound("Reply not found.");
  }
  const payload = {
    content,
  };

  Object.keys(payload).forEach((key) => {
    reply[key] = payload[key] ?? reply[key];
  });

  await reply.save();
  return { id: reply.id, ...reply._doc };
};

module.exports = edit;
