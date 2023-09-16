const subcategoryServices = require("../../../../lib/subcategory");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const subcategory = await subcategoryServices.edit(id, req.body);
    const { id: subcategoryId, category } = subcategory;
    const response = {
      code: 200,
      message: "Subcategory updated successfully",
      data: subcategory,
      links: {
        self: `/subcategories/${subcategoryId}`,
        category: `/categories/${category}`,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
