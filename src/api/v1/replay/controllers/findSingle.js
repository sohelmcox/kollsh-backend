const replayServices = require("../../../../lib/replay");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const replay = await replayServices.findSingle({ id, populate });
    const { id: replayId, comment } = replay;
    const response = {
      id: replayId,
      data: replay,
      links: {
        self: `/replays/${replayId}`,
        comment: `/comments/${populate ? comment?.id : comment}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
