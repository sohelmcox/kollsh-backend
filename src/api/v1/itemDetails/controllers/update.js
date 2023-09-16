const itemDetailsService = require("../../../../lib/itemDetails");

const update = async (req, res, next) => {
  const { id } = req.params;
  const {
    item,
    description,
    contactNumber,
    whatsappNumber,
    email,
    address,
    latitude,
    longitude,
  } = req.body;
  try {
    const { data, code } = await itemDetailsService.updateOrCreate(id, {
      item,
      description,
      contactNumber,
      whatsappNumber,
      email,
      address,
      latitude,
      longitude,
      images: ["imageId"],
    });

    const response = {
      code,
      message:
        code === 200
          ? "ItemDetails updated successfully"
          : "ItemDetails created successfully",
      id: data.id,
      data,
      links: {
        self: `/items/${data.id}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
