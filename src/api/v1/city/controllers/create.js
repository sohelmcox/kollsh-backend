const cityServices = require("../../../../lib/city");
/**
 * Create a new City.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { name, state, priority } = req.body;
  try {
    const city = await cityServices.create({
      name,
      state,
      priority,
    });
    const { id: cityId } = city;
    const response = {
      code: 201,
      message: "City Created Successfully",
      data: city,
      links: {
        self: `/cities/${cityId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
