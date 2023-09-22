const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Item } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");
const {
  create: createItemSuggestion,
  findSingle: findSingleItemSuggestion,
  edit: editItemSuggestion,
} = require("../itemSuggestion");
/**
 * Find a single item based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the item to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The item data with populated fields if requested.
 */
const findSingle = async ({ id, populate, user }) => {
  const populatedFields = parsePopulatedFields(populate);
  let item = await Item.findById(id);
  if (!item) {
    throw notFound("Item not found");
  }

  // Apply population
  if (populatedFields.length > 0) {
    item = await getSinglePopulatedFields(item, populatedFields);
    // item = await item.populate(populatedFields.join(" "));
  }
  // implement and store itemSuggestions when client clicks on item
  // if user is logged in
  if (user) {
    console.log("user", user);
    // is user already have userSuggestions then update the suggestion
    const existSuggestion = findSingleItemSuggestion({ id: user });
    if (existSuggestion) {
      // updated the itemSuggestions
      console.log("existSuggestion", existSuggestion);
      await editItemSuggestion({
        user,
        item: item.id,
        subcategories:
          existSuggestion.subcategories?.length < 2
            ? [...existSuggestion.subcategories, item.subcategory]
            : item.subcategory,
        brands:
          existSuggestion.brands?.length < 2
            ? [...existSuggestion.brands, item.brand]
            : item.brand,
      });
    } else {
      // create itemSuggestions
      console.log("create", existSuggestion);
      await createItemSuggestion({
        user,
        subcategories: item.subcategory,
        brands: item.brand,
      });
    }
  }
  return item;
};
module.exports = findSingle;
