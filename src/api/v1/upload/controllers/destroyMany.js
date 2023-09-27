const uploadService = require("../../../../lib/upload");
const { badRequest } = require("../../../../utils/error");

const destroyMany = async (req, res, next) => {
  const { ids } = req.body;
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw badRequest("Invalid Ids provided");
    }
    const deletedCount = await uploadService.destroyMany(ids);
    res
      .status(202)
      .json({ status: 202, message: `${deletedCount} files deleted.` });
  } catch (error) {
    next(error);
  }
};

module.exports = destroyMany;
