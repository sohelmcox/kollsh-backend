const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Replay, Comment } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single replay based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the replay to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The replay data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let replay = await Replay.findById(id).exec();
  if (!replay) {
    throw notFound("Replay Not Found");
  }
  const isCommentExist = Comment.findById(replay.comment);
  if (!isCommentExist) {
    throw notFound("This Comment Is Not Found");
  }
  // Apply population
  if (populatedFields.length > 0) {
    replay = await getSinglePopulatedFields(replay, populatedFields);
    // replay = await replay.populate(populatedFields.join(" "));
  }
  return { id: replay.id, ...replay._doc };
};
module.exports = findSingle;
