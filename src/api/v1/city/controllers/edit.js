const cityServices = require("../../../../lib/city");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const city = await cityServices.edit(id, req.body);
    const { id: cityId } = city;
    const response = {
      code: 200,
      message: "City updated successfully",
      data: city,
      links: {
        self: `/cities/${cityId}`,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
module.exports = edit;
