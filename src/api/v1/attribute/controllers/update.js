const attributeServices = require("../../../../lib/attribute");

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, attribute_values, subcategories, brands } = req.body;
  try {
    const { data, code } = await attributeServices.updateOrCreate(id, {
      name,
      attribute_values,
      subcategories,
      brands,
    });
    const { id: attributeId } = data;
    const response = {
      code,
      message:
        code === 200
          ? "Attribute updated successfully"
          : "Attribute created successfully",
      data,
      links: {
        self: `/attributes/${attributeId}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
