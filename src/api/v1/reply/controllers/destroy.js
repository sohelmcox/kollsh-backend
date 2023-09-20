const replyServices = require("../../../../lib/reply");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await replyServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
