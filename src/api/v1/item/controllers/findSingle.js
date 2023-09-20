const ItemService = require("../../../../lib/item");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";
  let user = undefined;
  if (req?.user) {
    user = req.user.id;
  }
  try {
    const item = await ItemService.findSingle({
      id,
      populate,
      user,
    });
    const { id: itemId, slug } = item;
    const response = {
      id: itemId,
      data: item,
      links: {
        self: `/items/${slug}`,
        author: `/items/${itemId}/publisher`,
        comments: `/items/${itemId}/comments`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
