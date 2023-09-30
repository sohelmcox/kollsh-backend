const { ItemSuggestion, Item } = require("../../../../../models");
const getItemSuggestion = require("../../../../../lib/item/itemSuggestion");
const { badRequest } = require("../../../../../utils/error");

const itemSuggestion = async (req, res, next) => {
  const { id, userId } = req.params;
  try {
    const existItemSuggestion = await ItemSuggestion.findOne({ user: userId });
    if (!existItemSuggestion) {
      res.status(404).json({
        message: "itemSuggestion not found for this user",
        code: 404,
      });
    }
    const item = Item.findById(id);
    if (!item) {
      throw badRequest("Item is not Found");
    }

    const itemSuggestion = await getItemSuggestion({
      userId,
      itemId: item.id,
      itemSubcategory: item.subcategory,
      itemBrand: item.brand,
    });
    console.log(itemSuggestion);
    res.status(200).json({ data: itemSuggestion });
  } catch (err) {
    next(err);
  }
};
module.exports = itemSuggestion;
