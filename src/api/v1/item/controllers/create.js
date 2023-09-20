const itemService = require("../../../../lib/item");
/**
 * Create a new item.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const {
    name,
    released,
    thumbnail,
    subcategory,
    state,
    cities,
    price,
    negotiable,
    is_argent,
    brand,
    // details part
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
    const response = await itemService.create({
      name,
      released,
      thumbnail,
      subcategory,
      state,
      cities,
      price,
      negotiable,
      is_argent,
      brand,
      seller: req.user.id,
      createdBy: req.user.id,
      updatedBy: req.user.id,
      // details part
      description,
      images,
      contactNumber,
      whatsappNumber,
      email,
      address,
      latitude,
      longitude,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
