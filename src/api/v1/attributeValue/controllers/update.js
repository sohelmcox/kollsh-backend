const attributeValueServices = require("../../../../lib/attributeValue");

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, color_code, attribute, value, brands } = req.body;
  try {
    const { data, code } = await attributeValueServices.updateOrCreate(id, {
      name,
      color_code,
      attribute,
      value,
      brands,
    });
    const { id: attributeValueId } = data;
    const response = {
      code,
      message:
        code === 200
          ? "AttributeValue updated successfully"
          : "AttributeValue created successfully",
      data,
      links: {
        self: `/attribute-values/${attributeValueId}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
