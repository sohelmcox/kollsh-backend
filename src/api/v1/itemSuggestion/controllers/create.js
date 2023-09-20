const itemSuggestionServices = require("../../../../lib/itemSuggestion");
/**
 * Create a new ItemSuggestion.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const create = async (req, res, next) => {
  const { user, item, subcategories, brands } = req.body;
  try {
    const itemSuggestion = await itemSuggestionServices.create({
      user,
      item,
      subcategories,
      brands,
    });
    const { id: itemSuggestionId } = itemSuggestion;
    const response = {
      code: 201,
      message: "ItemSuggestion Created Successfully",
      data: itemSuggestion,
      links: {
        self: `/item-suggestions/${itemSuggestionId}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
