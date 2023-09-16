const categoryServices = require("../../../../lib/category");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const category = await categoryServices.findSingle({ id, populate });
    const { id: categoryId } = category;
    const response = {
      id: categoryId,
      data: category,
      links: {
        self: `/categories/${categoryId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
