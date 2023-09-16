const countryServices = require("../../../../lib/country");

const findSingle = async (req, res, next) => {
  const { id } = req.params;
  const { populate } = req.query || "";

  try {
    const country = await countryServices.findSingle({ id, populate });
    const { id: countryId } = country;
    const response = {
      id: countryId,
      data: country,
      links: {
        self: `/countries/${countryId}`,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingle;
