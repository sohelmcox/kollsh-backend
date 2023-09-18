const replayServices = require("../../../../lib/replay");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const replay = await replayServices.edit(id, req.body);
    const { id: replayId } = replay;
    const response = {
      code: 200,
      message: "Replay updated successfully",
      data: replay,
      links: {
        self: `/replays/${replayId}`,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
