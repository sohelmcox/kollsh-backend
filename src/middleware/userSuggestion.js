const jwt = require("jsonwebtoken"); // For working with JWT tokens
const { ItemSuggestion } = require("../models");
const { create: createItemSuggestion } = require("../lib/itemSuggestion");
const tokenService = require("../lib/token");
const { authenticationError } = require("../utils/error");
const { findSingle: findSingleItem } = require("../lib/item");
const guestItemSuggestion = require("../lib/item/itemSuggestion/guestItemSuggestion");

const userSuggestion = async (req, res, next) => {
  const { id } = req.params;
  const item = await findSingleItem({ id });
  try {
    // Check if the user is logged in and has a bearer token
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      // If the user is logged in, decode the token to get user information
      const decoded = tokenService.decodeToken({ token });

      const user = await findUserByEmail(decoded.email);
      if (!user) {
        next(authenticationError("user not found"));
      }

      console.log(item);
      // check item suggestion exists for this user then update the existing one
      const itemSuggestion = await ItemSuggestion.findOne({ user: user.id });
      if (itemSuggestion) {
        itemSuggestion.user = userId;
        itemSuggestion.item = item.id;
        itemSuggestion.subcategories =
          itemSuggestion.subcategories.length > 3
            ? [item.subcategory]
            : [...itemSuggestion.subcategories, item.subcategory];
        itemSuggestion.brands =
          itemSuggestion.brands.length > 3
            ? [item.brand]
            : [...itemSuggestion.brands, item.brand];
        await itemSuggestion.save();
      } else {
        // Add a new suggestion to the database
        await createItemSuggestion({
          user: userId,
          item: item.id,
          subcategories: [item.subcategory],
          brands: [item.brand],
        });
      }
      next();
    }
    const itemSuggestion = await guestItemSuggestion({
      itemId: item.id,
      itemBrand: item.brand,
      itemCategory: item.console,
    });
    req.itemSuggestion = itemSuggestion;
    next();
  } catch (error) {
    console.error("Error in user suggestion middleware:", error);
    // Handle the error as needed
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = userSuggestion;
