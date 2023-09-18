const brandServices = require("../../../../lib/brand");

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, image, description, priority } = req.body;
  try {
    const { data, code } = await brandServices.updateOrCreate(id, {
      name,
      image,
      description,
      priority,
    });
    const { id: brandId } = data;
    const response = {
      code,
      message:
        code === 200
          ? "Brand updated successfully"
          : "Brand created successfully",
      data,
      links: {
        self: `/brands/${brandId}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
