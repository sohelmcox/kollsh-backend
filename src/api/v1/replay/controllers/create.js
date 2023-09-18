const replayServices = require("../../../../lib/replay");
/**
 * Create a new Replay.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { content, comment } = req.body;
  try {
    const replay = await replayServices.create({
      content,
      comment,
      user: req.user.id,
    });
    const { id: replayId } = replay;
    const response = {
      code: 201,
      message: "Replay Created Successfully",
      data: replay,
      links: {
        self: `/replays/${replayId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
