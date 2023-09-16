const stateServices = require("../../../../lib/state");
/**
 * Create a new State.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { name, image, cities, country, priority } = req.body;
  try {
    const state = await stateServices.create({
      name,
      image,
      cities,
      country,
      priority,
    });
    const { id: stateId } = state;
    const response = {
      code: 201,
      message: "State Created Successfully",
      data: state,
      links: {
        self: `/states/${stateId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
