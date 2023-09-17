const attributeValueServices = require("../../../../lib/attributeValue");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await attributeValueServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
