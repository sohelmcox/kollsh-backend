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
    description,
    released,
    thumbnail,
    subcategory,
    state,
    cities,
    price,
    negotiable,
    is_argent,
    brand,
  } = req.body;

  try {
    // Validate input data here if needed
    // ...

    const newItem = await itemService.create({
      name,
      description,
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
    });

    const response = {
      code: 201,
      message: "Item Created Successfully",
      id: newItem.id,
      data: newItem,
      links: {
        self: `/items/${newItem.id}`,
        seller: `/items/${newItem.id}/seller`,
        comments: `/item-details/${newItem.id}/comments`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
