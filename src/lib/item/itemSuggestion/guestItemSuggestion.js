const { ItemSuggestion, Item } = require("../../../models");

const guestItemSuggestion = async ({ itemId, itemCategory, itemBrand }) => {
  // Find other users who have liked the same item with similar category and brand
  const similarUsers = await ItemSuggestion.aggregate([
    {
      $match: {
        item: itemId,
        subcategories: { $in: [itemCategory] },
        brands: { $in: [itemBrand] },
      },
    },
    { $group: { _id: "$user", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  // Get item recommendations from similar users
  const itemRecommendations = await ItemSuggestion.aggregate([
    { $match: { user: { $in: similarUsers.map((u) => u._id) } } },
    { $group: { _id: "$item", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  const recommendedItems = await Item.find({
    _id: { $in: itemRecommendations.map((i) => i._id) },
  });

  return recommendedItems;
};

module.exports = guestItemSuggestion;
