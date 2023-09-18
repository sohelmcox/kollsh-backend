const userServices = require("../../../../lib/user");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userServices.edit(id, req.body);
    const { id: userId } = user;
    const response = {
      code: 200,
      message: "User updated successfully",
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
module.exports = edit;
