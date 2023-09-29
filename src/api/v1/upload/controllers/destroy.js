const uploadService = require("../../../../lib/upload");

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    await uploadService.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
