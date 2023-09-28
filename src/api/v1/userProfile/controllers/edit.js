const userProfileServices = require("../../../../lib/userProfile");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const userProfile = await userProfileServices.edit(id, req.body);
    const { id: userProfileId } = userProfile;
    const response = {
      code: 200,
      message: "UserProfile updated successfully",
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
module.exports = edit;
