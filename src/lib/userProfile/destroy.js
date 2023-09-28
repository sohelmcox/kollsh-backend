const { UserProfile } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an userProfile by its ID.
 *
 * @param {string} id - The ID of the userProfile to be deleted.
 * @throws {Error} - Throws an error if the userProfile with the provided ID is not found.
 */
const destroy = async (id) => {
  const userProfile = await UserProfile.findById(id);
  if (!userProfile) {
    throw notFound("userProfile not found.");
  }
  await userProfile.deleteOne();
};
module.exports = destroy;
