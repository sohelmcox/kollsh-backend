const itemSuggestionServices = require("../../../../lib/itemSuggestion");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const itemSuggestion = await itemSuggestionServices.edit(id, req.body);
    const { id: itemSuggestionId } = itemSuggestion;
    const response = {
      code: 200,
      message: "ItemSuggestion updated successfully",
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
module.exports = edit;
