const cityServices = require("../../../../lib/city");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await cityServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
