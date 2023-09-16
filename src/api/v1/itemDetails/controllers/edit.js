const itemDetailsServices = require("../../../../lib/itemDetails");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const itemDetails = await itemDetailsServices.edit(id, req.body);

    const response = {
      code: 200,
      message: "ItemDetails updated successfully",
      data: itemDetails,
      links: {
        self: `/item-details/${itemDetails.id}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
