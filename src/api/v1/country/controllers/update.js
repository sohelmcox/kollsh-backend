const countryServices = require("../../../../lib/country");

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, flag_image, code } = req.body;
  try {
    const country = await countryServices.updateOrCreate(id, {
      name,
      flag_image,
      code,
    });
    const { id: countryId } = country.data;
    const response = {
      code: country.code,
      message:
        country.code === 200
          ? "Country updated successfully"
          : "Country created successfully",
      data: country.data,
      links: {
        self: `/countries/${countryId}`,
      },
    };

    res.status(country.code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
