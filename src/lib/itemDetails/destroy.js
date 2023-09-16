const { ItemDetails } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an ItemDetails by its ID.
 *
 * @param {string} id - The ID of the ItemDetails to be deleted.
 * @throws {Error} - Throws an error if the ItemDetails with the provided ID is not found.
 */
const destroy = async (id) => {
  const itemDetails = await ItemDetails.findById(id);
  if (!itemDetails) {
    throw notFound("ItemDetails not found.");
  }
  // TODO:
  // Asynchronously delete all permissions details and images

  await itemDetails.deleteOne();
};
module.exports = destroy;
