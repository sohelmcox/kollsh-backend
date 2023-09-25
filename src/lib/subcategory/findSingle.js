const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Subcategory } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single subcategory based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the subcategory to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The subcategory data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let subcategory = await Subcategory.findById(id);
  if (!subcategory) {
    throw notFound("Subcategory Not Found");
  }

  // Apply population
  if (populatedFields.length > 0) {
    subcategory = await getSinglePopulatedFields(subcategory, populatedFields);
    // subcategory = await subcategory.populate(populatedFields.join(" "));
  }
  // return { id: subcategory.id, ...subcategory._doc };
  return subcategory;
};
module.exports = findSingle;
