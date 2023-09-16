const itemDetailsServices = require("../../../../lib/itemDetails");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const itemDetails = await itemDetailsServices.findSingle({ id, populate });
    const { id: itemDetailsId } = itemDetails;
    const response = {
      id: itemDetailsId,
      data: itemDetails,
      links: {
        self: `/item-details/${itemDetailsId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
