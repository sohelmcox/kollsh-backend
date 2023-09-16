const brandServices = require("../../../../lib/brand");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const brand = await brandServices.edit(id, req.body);
    const { id: brandId } = brand;
    const response = {
      code: 200,
      message: "Brand updated successfully",
      data: brand,
      links: {
        self: `/brands/${brandId}`,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
