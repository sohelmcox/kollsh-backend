const ItemService = require("../../../../../lib/item");

const find = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await ItemService.findSeller(id);
    const meta = {
      links: {
        item: `/items/${id}`,
        self: `/items/${id}/seller`,
      },
    };
    res.status(200).json({ data, meta });
  } catch (error) {
    next(error);
  }
};

module.exports = find;
