const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Role } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single role based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the role to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The role data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let role = await Role.findById(id).exec();
  if (!role) {
    throw notFound();
  }

  // Apply population
  if (populatedFields.length > 0) {
    role = await getSinglePopulatedFields(role, populatedFields);
    // role = await role.populate(populatedFields.join(" "));
  }
  return { ...role._doc, id: role.id };
};
module.exports = findSingle;
