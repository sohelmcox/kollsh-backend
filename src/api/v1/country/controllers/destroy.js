const countryServices = require("../../../../lib/country");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await countryServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
