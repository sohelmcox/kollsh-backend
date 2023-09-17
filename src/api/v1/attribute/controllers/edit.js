const attributeServices = require("../../../../lib/attribute");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const attribute = await attributeServices.edit(id, req.body);
    const { id: attributeId } = attribute;
    const response = {
      code: 200,
      message: "Attribute updated successfully",
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
module.exports = edit;
