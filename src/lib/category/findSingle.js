const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Category } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single category based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the category to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The category data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let category = await Category.findById(id).exec();
  if (!category) {
    throw notFound("Category Not Found");
  }

  // Apply population
  if (populatedFields.length > 0) {
    category = await getSinglePopulatedFields(category, populatedFields);
    // category = await category.populate(populatedFields.join(" "));
  }
  return { id: category.id, ...category._doc };
};
module.exports = findSingle;
