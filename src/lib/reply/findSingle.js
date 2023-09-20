const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Reply, Comment } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single reply based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the reply to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The reply data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let reply = await Reply.findById(id).exec();
  if (!reply) {
    throw notFound("Reply Not Found");
  }
  const isCommentExist = Comment.findById(reply.comment);
  if (!isCommentExist) {
    throw notFound("This Comment Is Not Found");
  }
  // Apply population
  if (populatedFields.length > 0) {
    reply = await getSinglePopulatedFields(reply, populatedFields);
    // reply = await reply.populate(populatedFields.join(" "));
  }
  // return { id: reply.id, ...reply._doc };
  return reply;
};
module.exports = findSingle;
