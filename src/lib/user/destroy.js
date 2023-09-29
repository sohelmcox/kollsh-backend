const { User, UserProfile } = require("../../models");
const { notFound } = require("../../utils/error");
const destroyUserProfile = require("../../lib/userProfile/destroy");
/**
 * Destroy (delete) an user by its ID.
 *
 * @param {string} id - The ID of the user to be deleted.
 * @throws {Error} - Throws an error if the user with the provided ID is not found.
 */
const destroy = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw notFound("user not found.");
  }
  const userProfile = await UserProfile.findOne({ user: id });
  if (userProfile) {
    await destroyUserProfile(userProfile._id);
  }
  await user.deleteOne();
};
module.exports = destroy;
