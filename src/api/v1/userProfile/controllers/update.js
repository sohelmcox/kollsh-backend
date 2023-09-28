const userProfileServices = require("../../../../lib/userProfile");

const update = async (req, res, next) => {
  const { id } = req.params;
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
    const { data, code } = await userProfileServices.updateOrCreate(id, {
      firstName,
      lastName,
      boi,
      country,
      state,
      city,
      avatar,
      social_link,
    });
    const { id: userProfileId } = data;
    const response = {
      code,
      message:
        code === 200
          ? "UserProfile updated successfully"
          : "UserProfile created successfully",
      data,
      links: {
        self: `/userProfiles/${userProfileId}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
