const ItemService = require("../../../../lib/item");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const item = await ItemService.findSingle({ id, populate });
    const response = {
      data: item,
      links: {
        self: `/items/${item.id}`,
        author: `/items/${item.id}/publisher`,
        comments: `/items/${item.id}/comments`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = findSingle;
