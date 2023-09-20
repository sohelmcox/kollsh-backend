const itemSuggestionServices = require("../../../../lib/itemSuggestion");

const update = async (req, res, next) => {
  const { id } = req.params;
  const { user, categories, subcategories, brands } = req.body;
  try {
    const { data, code } = await itemSuggestionServices.updateOrCreate(id, {
      user,
      categories,
      subcategories,
      brands,
    });
    const { id: itemSuggestionId } = data;
    const response = {
      code,
      message:
        code === 200
          ? "ItemSuggestion updated successfully"
          : "ItemSuggestion created successfully",
      data,
      links: {
        self: `/item-suggestions/${itemSuggestionId}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
