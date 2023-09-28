const { UserProfile } = require("../../models");
const { badRequest } = require("../../utils/error");
const { slugify } = require("../../utils/generateUniqueSlug");
const { create: createMetadata } = require("../metadata");

/**
 * Create a new userProfile.
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
 * @returns {Object} - The newly created userProfile with additional properties (id).
 */
const create = async ({
  firstName,
  lastName,
  boi,
  country,
  state,
  city,
  avatar,
  social_link,
  user,
}) => {
  const userProfileData = {
    firstName,
    lastName,
    boi,
    country,
    state,
    city,
    avatar,
    social_link,
    user,
  };
  const newUserProfile = new UserProfile(userProfileData);

  // Save the new userProfile to the database
  await newUserProfile.save();

  return { id: newUserProfile.id, ...newUserProfile._doc };
};

module.exports = create;
