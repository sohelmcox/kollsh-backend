const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { ItemSuggestion } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single itemSuggestion based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the itemSuggestion to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The itemSuggestion data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let itemSuggestion = await ItemSuggestion.findById(id);
  if (!itemSuggestion) {
    throw notFound("ItemSuggestion not found");
  }

  // Apply population
  if (populatedFields.length > 0) {
    itemSuggestion = await getSinglePopulatedFields(
      itemSuggestion,
      populatedFields,
    );
    // itemSuggestion = await itemSuggestion.populate(populatedFields.join(" "));
  }
  // return { id: itemSuggestion.id, ...itemSuggestion._doc };
  return itemSuggestion;
};
module.exports = findSingle;
