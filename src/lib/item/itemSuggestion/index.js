const { User, ItemSuggestion, Item } = require("../../../models");
const { badRequest } = require("../../../utils/error");

// Updated collaborative filtering logic with subcategory and brand
const itemSuggestion = async ({
  userId,
  itemId,
  itemSubcategory,
  itemBrand,
}) => {
  const user = await User.findById(userId);

  if (!user) {
    throw badRequest("User not found");
  }

  // Find other users who have liked the same item with similar subcategory and brand
  const similarUsers = await ItemSuggestion.aggregate([
    {
      $match: {
        item: itemId,
        user: { $ne: user._id },
        subcategories: { $in: [itemSubcategory] },
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
module.exports = itemSuggestion;
