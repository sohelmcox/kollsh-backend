const { Item } = require("../../models");

/**
 * Update or create an item by its ID.
 *
 * @param {string} id - The ID of the item to update. If it doesn't exist, a new item will be created.
 * @param {Object} data - Updated data for the item.
 * @param {string} data.name - The updated name of the item.
 * @param {string} data.description - The updated description of the item.
 * @param {Date} [data.released=Date.now()] - The updated release date of the item (default: current date).
 * @param {string} data.thumbnail - The updated URL or path to the item's thumbnail image.
 * @param {string} data.slug - The updated slug of the item.
 * @param {string} data.subcategory - The updated subcategory of the item.
 * @param {string} data.state - The updated state or condition of the item.
 * @param {string[]} data.cities - The updated array of cities associated with the item.
 * @param {number} data.price - The updated price of the item.
 * @param {boolean} [data.negotiable=false] - The updated indication of whether the price is negotiable (default: false).
 * @param {boolean} [data.is_argent=false] - The updated indication of whether the item is argent (default: false).
 * @param {string|null} [data.brand=null] - The updated brand of the item (default: null).
 * @param {string} data.seller - The updated seller of the item.
 * @returns {Object} - An object containing the updated item or newly created item and a status code (201 for creation, 200 for update).
 */

const updateOrCreate = async (
  id,
  {
    name,
    description,
    released = Date.now(),
    thumbnail,
    slug,
    subcategory,
    state,
    cities,
    price,
    negotiable = false,
    is_argent = false,
    brand = null,
    seller,
  },
) => {
  const item = await Item.findById(id);

  if (!item) {
    const newItem = await create({
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
    });
    return {
      newItem,
      code: 201,
    };
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

  item.overwrite(payload);
  await item.save();

  return { item: { ...item._doc, id: item.id }, code: 200 };
};
module.exports = updateOrCreate;
