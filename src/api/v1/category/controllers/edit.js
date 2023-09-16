const brandServices = require("../../../../lib/category");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await brandServices.edit(id, req.body);
    const { id: brandId } = category;
    const response = {
      code: 200,
      message: "Category updated successfully",
      data: category,
      links: {
        self: `/categories/${brandId}`,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
