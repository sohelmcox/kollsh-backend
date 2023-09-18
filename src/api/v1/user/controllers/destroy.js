const userServices = require("../../../../lib/user");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await userServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
