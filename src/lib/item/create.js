const { Item } = require("../../models");
const { generateUniqueSlug } = require("../../utils/generateUniqueSlug");

/**
 * Create a new item.
 *
 * @param {Object} itemData - Data to create a new item.
 * @param {string} itemData.name - The name of the item.
 * @param {string} itemData.description - The description of the item.
 * @param {Date} itemData.released - The release date of the item.
 * @param {string} itemData.thumbnail - The URL or path to the item's thumbnail image.
 * @param {string} itemData.subcategory - The subcategory of the item.
 * @param {string} itemData.state - The state or condition of the item.
 * @param {string[]} itemData.cities - An array of cities associated with the item.
 * @param {number} itemData.price - The price of the item.
 * @param {boolean} itemData.negotiable - Indicates whether the price is negotiable.
 * @param {boolean} itemData.is_argent - Indicates whether the item is argent.
 * @param {string} itemData.brand - The brand of the item.
 * @param {string} itemData.seller - The seller of the item.
 * @param {string} itemData.createdBy - The user who created the item.
 * @param {string} itemData.updatedBy - The user who updated the item.
 *
 * @returns {Object} - The newly created item with additional properties (id).
 */
const create = async ({
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
  seller,
  createdBy,
  updatedBy,
}) => {
  // Generate a unique slug
  const uniqueSlug = await generateUniqueSlug(Item, name);
  const itemData = {
    name,
    slug: uniqueSlug,
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
    seller,
    createdBy,
    updatedBy,
  };
  const newItem = new Item(itemData);

  // Validate data using Mongoose schema validation
  const validationError = newItem.validateSync();
  if (validationError) {
    throw new Error(validationError.message);
  }

  // Save the new item to the database
  await newItem.save();

  return { ...newItem._doc, id: newItem.id };
};

module.exports = create;
