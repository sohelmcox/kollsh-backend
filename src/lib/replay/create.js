const { Replay } = require("../../models");

const { badRequest } = require("../../utils/error");

/**
 * Create a new replay.
 *
 * @param {Object} replayData - Data to create a new replay.
 * @param {string} replayData.content - The content of the replay.
 * @param {string} replayData.comment - The comment of the replay.
 * @param {string} replayData.user - The user of the replay creator.
 *
 * @returns {Object} - The newly created replay with additional properties (id).
 */
const create = async ({ content, comment, user }) => {
  const replayData = {
    content,
    comment,
    user,
  };
  const newReplay = new Replay(replayData);

  // Save the new replay to the database
  await newReplay.save();

  return { id: newReplay.id, ...newReplay._doc };
};

module.exports = create;
