const userProfileServices = require("../../../../lib/userProfile");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await userProfileServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
