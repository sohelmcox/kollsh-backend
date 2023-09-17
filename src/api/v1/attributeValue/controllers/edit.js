const attributeValueServices = require("../../../../lib/attributeValue");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const attributeValue = await attributeValueServices.edit(id, req.body);
    const { id: attributeValueId } = attributeValue;
    const response = {
      code: 200,
      message: "AttributeValue updated successfully",
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
module.exports = edit;
