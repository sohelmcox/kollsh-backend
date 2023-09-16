const subcategoryServices = require("../../../../lib/subcategory");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";
  try {
    const subcategory = await subcategoryServices.findSingle({ id, populate });
    const { id: subcategoryId, category } = subcategory;
    const response = {
      id: subcategoryId,
      data: subcategory,
      links: {
        self: `/subcategories/${subcategoryId}`,
        category: `/categories/${populate ? category._id : subcategoryId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
