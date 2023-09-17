const attributeServices = require("../../../../lib/attribute");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const attribute = await attributeServices.findSingle({ id, populate });
    const { id: attributeId } = attribute;
    const response = {
      id: attributeId,
      data: attribute,
      links: {
        self: `/attributes/${attributeId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
