const cityServices = require("../../../../lib/city");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const city = await cityServices.findSingle({ id, populate });
    const { id: cityId } = city;
    const response = {
      id: cityId,
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

module.exports = findSingle;
