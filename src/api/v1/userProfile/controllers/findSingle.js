const userProfileServices = require("../../../../lib/userProfile");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const userProfile = await userProfileServices.findSingle({ id, populate });
    const { id: userProfileId } = userProfile;
    const response = {
      id: userProfileId,
      data: userProfile,
      links: {
        self: `/userProfiles/${userProfileId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
