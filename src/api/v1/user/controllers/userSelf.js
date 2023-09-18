const userServices = require("../../../../lib/user");

const userSelf = async (req, res, next) => {
  const { id } = req.user;
  const { populate } = req.query || "";
  console.log("user", req.user);
  try {
    const user = await userServices.userSelf({ id, populate });
    const { id: userId } = user;
    const response = {
      id: userId,
      data: user,
      links: {
        self: `/users/${userId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = userSelf;
