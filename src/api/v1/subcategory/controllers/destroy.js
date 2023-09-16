const subcategoryServices = require("../../../../lib/subcategory");

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await subcategoryServices.destroy(id);
    res.status(202).send("ok");
  } catch (error) {
    next(error);
  }
};

module.exports = destroy;
