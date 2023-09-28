const { UserProfile } = require("../../models");

/**
 * Update or create an userProfile by its ID.
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
 * @returns {Object} - An object containing the updated userProfile or newly created userProfile and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (
  id,
  { firstName, lastName, boi, country, state, city, avatar, social_link },
) => {
  const userProfile = await UserProfile.findById(id);
  if (!userProfile) {
    const newUserProfile = await UserProfile.create({
      firstName,
      lastName,
      boi,
      country,
      state,
      city,
      avatar,
      social_link,
    });
    await newUserProfile.save();
    return {
      data: { ...newUserProfile._doc },
      code: 201,
    };
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

  userProfile.overwrite(payload);
  await userProfile.save();

  return { data: { ...userProfile._doc }, code: 200 };
};
module.exports = updateOrCreate;
