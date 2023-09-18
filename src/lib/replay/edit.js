const { Replay } = require("../../models");
const { notFound } = require("../../utils/error");
const { slugify } = require("../../utils/generateUniqueSlug");
/**
 * Edit (update) an replay by its ID.
 *
 * @param {Object} replayData - Data to create a new replay.
 * @param {string} replayData.content - The content of the replay.
 * @param {string} replayData.comment - The comment of the replay.
 *
 * @returns {Object} - The edited replay with additional properties (id).
 * @throws {Error} - Throws an error if the replay with the provided ID is not found.
 */

const edit = async (id, { content }) => {
  const replay = await Replay.findById(id);
  if (!replay) {
    throw notFound("Replay not found.");
  }
  const payload = {
    content,
  };

  Object.keys(payload).forEach((key) => {
    replay[key] = payload[key] ?? replay[key];
  });

  await replay.save();
  return { id: replay.id, ...replay._doc };
};

module.exports = edit;
