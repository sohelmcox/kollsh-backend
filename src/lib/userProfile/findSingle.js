const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { UserProfile } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single userProfile based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the userProfile to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The userProfile data with populated fields if requested.
 */
const findSingle = async ({ id, populate }) => {
  const populatedFields = parsePopulatedFields(populate);
  let userProfile = await UserProfile.findById(id);
  if (!userProfile) {
    throw notFound("UserProfile not found");
  }

  // Apply population
  if (populatedFields.length > 0) {
    userProfile = await getSinglePopulatedFields(userProfile, populatedFields);
    // userProfile = await userProfile.populate(populatedFields.join(" "));
  }
  // return { id: userProfile.id, ...userProfile._doc };
  return userProfile;
};
module.exports = findSingle;
