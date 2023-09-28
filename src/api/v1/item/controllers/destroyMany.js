const itemService = require("../../../../lib/item");
const { badRequest } = require("../../../../utils/error");

const destroyMany = async (req, res, next) => {
  const { ids } = req.body;
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw badRequest("Invalid Ids provided");
    }
    const {
      deletedItems,
      deletedItemDetails,
      deletedComments,
      deletedMetadata,
    } = await itemService.destroyMany(ids);
    res.status(202).json({
      status: 202,
      message: `${deletedItems} ${
        deletedItems > 1 ? "items" : "items"
      } deleted.`,
      deletedItemDetails,
      deletedComments,
      deletedMetadata,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = destroyMany;
