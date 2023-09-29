const { Item, ItemDetails, Comment, Reply } = require("../../models");
const { notFound } = require("../../utils/error");
const DeleteAssociatedDetails = require("./utils");

/**
 * Destroy (delete) an item by its ID.
 * @param {string} id - The ID of the item to be deleted.
 * @throws {Error} - Throws an error if the item with the provided ID is not found.
 */
const destroy = async (id) => {
  const item = await Item.findById(id);
  if (!item) {
    throw notFound("item not found.");
  }
  if (item._id) {
    await DeleteAssociatedDetails(item._id);
  }
  await item.deleteOne();
};

module.exports = destroy;
