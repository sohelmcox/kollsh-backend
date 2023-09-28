const userProfileServices = require("../../../../lib/userProfile");
/**
 * Create a new UserProfile.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const {
    firstName,
    lastName,
    boi,
    country,
    state,
    city,
    avatar,
    social_link,
  } = req.body;
  try {
    const userProfile = await userProfileServices.create({
      firstName,
      lastName,
      boi,
      country,
      state,
      city,
      avatar,
      social_link,
      user: req.user.id,
    });
    const { id: userProfileId } = userProfile;
    const response = {
      code: 201,
      message: "UserProfile Created Successfully",
      data: userProfile,
      links: {
        self: `/userProfiles/${userProfileId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
