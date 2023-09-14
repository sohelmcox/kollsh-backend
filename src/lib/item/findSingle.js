const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Item } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single item based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the item to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The item data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let item = await Item.findById(id).exec();
  if (!item) {
    throw notFound();
  }

  // Apply population
  if (populatedFields.length > 0) {
    item = await getSinglePopulatedFields(item, populatedFields);
    // item = await item.populate(populatedFields.join(" "));
  }
  return { ...item._doc, id: item.id };
};
module.exports = findSingle;
