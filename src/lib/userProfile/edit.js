const { UserProfile } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an userProfile by its ID.
 *
 * @param {Object} userProfileData - Data to create a new userProfile.
 * @param {string} userProfileData.firstName - The firstName of the user.
 * @param {string} userProfileData.lastName - The lastName of the user.
 * @param {string} userProfileData.bio - The bio of the user.
 * @param {string} userProfileData.country - The country of the user.
 * @param {string} userProfileData.state - The state of the user.
 * @param {string} userProfileData.city - The city of the user.
 * @param {string} userProfileData.avatar - The avatar of the user
 * @param {string} userProfileData.social_link - The social link of the user
 * @param {string} userProfileData.user - The user object
 * @returns {Object} - The edited userProfile with additional properties (id).
 * @throws {Error} - Throws an error if the userProfile with the provided ID is not found.
 */

const edit = async (
  id,
  { firstName, lastName, boi, country, state, city, avatar, social_link },
) => {
  const userProfile = await UserProfile.findById(id);
  if (!userProfile) {
    throw notFound("UserProfile not found.");
  }

  const payload = {
    firstName,
    lastName,
    boi,
    country,
    state,
    city,
    avatar,
    social_link,
  };

  Object.keys(payload).forEach((key) => {
    userProfile[key] = payload[key] ?? userProfile[key];
  });

  await userProfile.save();
  return { id: userProfile.id, ...userProfile._doc };
};

module.exports = edit;
