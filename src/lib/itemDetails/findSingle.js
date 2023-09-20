const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { ItemDetails } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single itemDetails based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the itemDetails to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The itemDetails data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let itemDetails = await ItemDetails.findById(id).exec();
  if (!itemDetails) {
    throw notFound();
  }

  // Apply population
  if (populatedFields.length > 0) {
    itemDetails = await getSinglePopulatedFields(itemDetails, populatedFields);
    // itemDetails = await itemDetails.populate(populatedFields.join(" "));
  }
  return itemDetails;
};
module.exports = findSingle;
