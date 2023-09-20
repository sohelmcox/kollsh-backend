const commentServices = require("../../../../lib/comment");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await commentServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
