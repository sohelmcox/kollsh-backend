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
    slug,
    subcategory,
    state,
    cities,
    price,
    negotiable,
    is_argent,
    brand,
    publisher,
  } = req.body;

  try {
    // Validate input data here if needed
    // ...

    const newItem = await itemService.create({
      name,
      description,
      released,
      thumbnail,
      slug,
      subcategory,
      state,
      cities,
      price,
      negotiable,
      is_argent,
      brand,
      publisher: req.user.id,
    });

    const response = {
      code: 201,
      message: "Item Created Successfully",
      data: newItem,
      links: {
        self: `/items/${newItem.id}`,
        author: `/items/${req.user.id}author`,
        comments: `/items/${newItem.id}/comments`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
