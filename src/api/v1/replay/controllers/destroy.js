const replayServices = require("../../../../lib/replay");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await replayServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
