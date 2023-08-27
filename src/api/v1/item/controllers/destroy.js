const itemService = require("../../../../lib/item");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await itemService.destroy(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = destroy;
