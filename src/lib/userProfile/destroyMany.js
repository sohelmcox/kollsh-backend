const { UserProfile } = require("../../models");
/**
 * Destroy (delete) multiple userProfiles by their IDs.
 *
 * @param {string[]} userProfileIds - An array of IDs of the userProfiles to be deleted.
 * @returns {number} - The number of deleted userProfiles.
 * @throws {Error} - Throws an error if there was an issue while deleting userProfiles.
 */
const destroyMany = async (userProfileIds) => {
  try {
    const result = await UserProfile.deleteMany({
      _id: { $in: userProfileIds },
    });
    return result.deletedCount;
  } catch (error) {
    throw new Error(`Error deleting userProfiles: ${error.message}`);
  }
};
module.exports = destroyMany;
