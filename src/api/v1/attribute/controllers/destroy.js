const attributeServices = require("../../../../lib/attribute");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await attributeServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
