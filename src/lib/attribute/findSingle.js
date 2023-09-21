const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Attribute } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single attribute based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the attribute to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The attribute data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let attribute = await Attribute.findById(id);
  if (!attribute) {
    throw notFound("Attribute not found");
  }

  // Apply population
  if (populatedFields.length > 0) {
    attribute = await getSinglePopulatedFields(attribute, populatedFields);
    // attribute = await attribute.populate(populatedFields.join(" "));
  }
  // id: attribute.id, ...attribute._doc };
  return attribute;
};
module.exports = findSingle;
