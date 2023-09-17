const attributeValueServices = require("../../../../lib/attributeValue");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const attributeValue = await attributeValueServices.findSingle({
      id,
      populate,
    });
    const { id: attributeValueId } = attributeValue;
    const response = {
      id: attributeValueId,
      data: attributeValue,
      links: {
        self: `/attribute-values/${attributeValueId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
