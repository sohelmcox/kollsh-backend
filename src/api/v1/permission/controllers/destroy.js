const permissionServices = require("../../../../lib/permission");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await permissionServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
