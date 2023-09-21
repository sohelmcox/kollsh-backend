const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Comment } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single comment based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the comment to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The comment data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let comment = await Comment.findById(id).exec();
  if (!comment) {
    throw notFound();
  }

  // Apply population
  if (populatedFields.length > 0) {
    comment = await getSinglePopulatedFields(comment, populatedFields);
    // comment = await comment.populate(populatedFields.join(" "));
  }
  // return { id: comment.id, ...comment._doc };
  return comment;
};
module.exports = findSingle;
