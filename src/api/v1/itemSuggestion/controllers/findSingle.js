const itemSuggestionServices = require("../../../../lib/itemSuggestion");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const itemSuggestion = await itemSuggestionServices.findSingle({
      id,
      populate,
    });
    const { id: itemSuggestionId } = itemSuggestion;
    const response = {
      id: itemSuggestionId,
      data: itemSuggestion,
      links: {
        self: `/item-suggestions/${itemSuggestionId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
