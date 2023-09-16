const countryServices = require("../../../../lib/country");

const edit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const country = await countryServices.edit(id, req.body);
    const { id: countryId } = country;
    const response = {
      code: 200,
      message: "Country updated successfully",
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
module.exports = edit;
