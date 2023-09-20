const itemDetailsService = require("../../../../lib/itemDetails");
/**
 * Create a new itemDetails.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const {
    item,
    description,
    images,
    contactNumber,
    whatsappNumber,
    email,
    address,
    latitude,
    longitude,
  } = req.body;
  try {
    const itemDetails = await itemDetailsService.create({
      item,
      description,
      images,
      contactNumber,
      whatsappNumber,
      email,
      address,
      latitude,
      longitude,
    });
    const response = {
      code: 201,
      message: "ItemDetails Created Successfully",
      data: itemDetails,
      links: {
        self: `/item-details/${itemDetails.id}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
