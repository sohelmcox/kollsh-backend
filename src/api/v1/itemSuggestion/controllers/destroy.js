const itemSuggestionServices = require("../../../../lib/itemSuggestion");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await itemSuggestionServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
