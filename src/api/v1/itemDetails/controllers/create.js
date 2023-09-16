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
    contactNumber,
    whatsappNumber,
    email,
    address,
    latitude,
    longitude,
  } = req.body;
  // TODO: change Images to real Image Id
  try {
    const itemDetails = await itemDetailsService.create({
      item,
      description,
      contactNumber,
      whatsappNumber,
      email,
      address,
      latitude,
      longitude,
      images: ["imageId", "imageId"],
    });
    const response = {
      code: 201,
      message: "ItemDetails Created Successfully",
      id: itemDetails.id,
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
