const itemService = require("../../../../lib/item/index");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await itemService.edit(id, req.body);

    const response = {
      code: 200,
      message: "Item updated successfully",
      data: item,
      links: {
        self: `/items/${item.id}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
