const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Brand } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single brand based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the brand to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The brand data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let brand = await Brand.findById(id).exec();
  if (!brand) {
    throw notFound();
  }

  // Apply population
  if (populatedFields.length > 0) {
    brand = await getSinglePopulatedFields(brand, populatedFields);
    // brand = await brand.populate(populatedFields.join(" "));
  }
  return { id: brand.id, ...brand._doc };
};
module.exports = findSingle;
