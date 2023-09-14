const { Item, User } = require("../../models");
const { notFound } = require("../../utils/error");

const getUserDTO = require("../../utils/getUserDTO");
/**
 * Find the seller of an item by the item's ID.
 *
 * @param {string} itemId - The ID of the item for which to find the seller.
 * @returns {Object} - An object containing the seller's ID and user data.
 * @throws {Error} - Throws an error if the item with the provided ID is not found.
 */
const findSeller = async (itemId) => {
  const item = await Item.findById(itemId).exec();
  if (!item) {
    throw notFound();
  }
  const seller = await User.findById(item?._doc?.seller).exec();
  const data = getUserDTO(seller._doc);
  return {
    id: seller.id,
    data: { ...data },
  };
};

module.exports = findSeller;
