const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { AttributeValue } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single attributeValue based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the attributeValue to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The attributeValue data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let attributeValue = await AttributeValue.findById(id).exec();
  if (!attributeValue) {
    throw notFound();
  }

  // Apply population
  if (populatedFields.length > 0) {
    attributeValue = await getSinglePopulatedFields(
      attributeValue,
      populatedFields,
    );
    // attributeValue = await attributeValue.populate(populatedFields.join(" "));
  }
  // return { id: attributeValue.id, ...attributeValue._doc };
  return attributeValue;
};
module.exports = findSingle;
