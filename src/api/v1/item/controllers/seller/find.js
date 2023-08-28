const ItemService = require("../../../../../lib/item");

const find = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comments = await ItemService.findSeller(id);
    const links = {
      self: `/items/${id}`,
    };
    res.status(200).json({ data: comments, links });
  } catch (error) {
    next(error);
  }
};

module.exports = find;
