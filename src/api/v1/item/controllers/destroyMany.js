const itemService = require("../../../../lib/item");

const destroyMany = async (req, res, next) => {
  const { ids } = req.body;
  console.log(ids);
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Invalid Ids provided." });
  }
  try {
    const deletedCount = await itemService.deleteMany(ids);
    res.status(202).json({ message: `${deletedCount} items deleted.` });
  } catch (error) {
    next(error);
  }
};

module.exports = destroyMany;
