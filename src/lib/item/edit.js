const { Item } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an item by its ID.
 *
 * @param {string} id - The ID of the item to be edited.
 * @param {Object} data - Updated data for the item.
 * @param {string} data.name - The updated name of the item.
 * @param {string} data.description - The updated description of the item.
 * @param {Date} data.released - The updated release date of the item.
 * @param {string} data.thumbnail - The updated URL or path to the item's thumbnail image.
 * @param {string} data.slug - The updated slug of the item.
 * @param {string} data.subcategory - The updated subcategory of the item.
 * @param {string} data.state - The updated state or condition of the item.
 * @param {string[]} data.cities - The updated array of cities associated with the item.
 * @param {number} data.price - The updated price of the item.
 * @param {boolean} data.negotiable - The updated indication of whether the price is negotiable.
 * @param {boolean} data.is_argent - The updated indication of whether the item is argent.
 * @param {string} data.brand - The updated brand of the item.
 * @param {string} data.seller - The updated seller of the item.
 * @returns {Object} - The edited item with additional properties (id).
 * @throws {Error} - Throws an error if the item with the provided ID is not found.
 */

const edit = async (
  id,
  {
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
    seller,
  },
) => {
  const item = await Item.findById(id);
  if (!item) {
    throw notFound("Item not found.");
  }

  const payload = {
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
    seller,
  };

  Object.keys(payload).forEach((key) => {
    item[key] = payload[key] ?? item[key];
  });

  await item.save();
  return { ...item._doc, id: item.id };
};

module.exports = edit;
