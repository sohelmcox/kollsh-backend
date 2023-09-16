const countryServices = require("../../../../lib/country");
/**
 * Create a new Country.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { name, flag_image, code } = req.body;

  try {
    const country = await countryServices.create({
      name,
      flag_image,
      code,
    });
    const { id: countryId } = country;
    const response = {
      code: 201,
      message: "Country Created Successfully",
      data: country,
      links: {
        self: `/countries/${countryId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
