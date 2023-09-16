const uploadService = require("../../../../lib/upload");

const findSingle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await uploadService.findSingle(id);
    const { id: itemId } = item;
    const response = {
      id: itemId,
      data: item,
      links: {
        self: `/upload/files/${itemId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
