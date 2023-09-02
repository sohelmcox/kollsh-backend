const articleService = require("../../../../lib/item");

const update = async (req, res, next) => {
  const { id } = req.params;
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
  } = req.body;
  try {
    const { item, code } = await articleService.updateOrCreate(id, {
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
      code,
      message:
        code === 200
          ? "Item updated successfully"
          : "Item created successfully",
      data: item,
      links: {
        self: `/items/${item.id}`,
      },
    };

    res.status(code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
