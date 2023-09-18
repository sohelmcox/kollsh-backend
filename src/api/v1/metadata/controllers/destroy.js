const metadataServices = require("../../../../lib/metadata");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await metadataServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
