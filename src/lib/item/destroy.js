const { Item } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an item by its ID.
 *
 * @param {string} id - The ID of the item to be deleted.
 * @throws {Error} - Throws an error if the item with the provided ID is not found.
 */
const destroy = async (id) => {
  const item = await Item.findById(id);
  if (!item) {
    throw notFound("item not found.");
  }
  // TODO:
  // Asynchronously delete all item details and images

  await item.deleteOne();
};
module.exports = destroy;
