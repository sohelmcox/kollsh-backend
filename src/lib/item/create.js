const { Item } = require("../../models");
const { generateUniqueSlug } = require("../../utils/generateUniqueSlug");
const { create: createItemDetails } = require("../itemDetails");
const { create: createMetadata } = require("../metadata");
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
 * --details
 * @param {string} itemData.description - The description of the item.
 * @param {string[]} itemData.images - An array of images associated with the item.
 * @param {string} itemData.contactNumber - The contact number of the item.
 * @param {string} itemData.whatsappNumber - The whatsapp number of the item.
 * @param {string} itemData.email - The email of the item.
 * @param {string} itemData.address - The address of the item.
 * @param {number} itemData.latitude - The latitude of the item.
 * @param {number} itemData.longitude - The longitude of the item.
 *
 * @returns {Object} - The newly created item with additional properties (id).
 */
const create = async ({
  name,
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
  // details part
  description,
  images,
  contactNumber,
  whatsappNumber,
  email,
  address,
  latitude,
  longitude,
}) => {
  // Generate a unique slug
  const uniqueSlug = await generateUniqueSlug(Item, name);
  const itemData = {
    name,
    slug: uniqueSlug,
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

  const metadataObject = {
    title: name,
    description,
    image: thumbnail,
    keywords: name.split(" "),
  };
  // create metadata
  const newMetadata = await createMetadata(metadataObject);
  // Create item details
  const itemDetailsData = {
    item: newItem._id,
    description,
    images,
    contactNumber,
    whatsappNumber,
    email,
    address,
    latitude,
    longitude,
    metadata: newMetadata.id,
  };

  // create item details
  const itemDetailsCreateService = await createItemDetails({
    ...itemDetailsData,
  });
  // generate response
  const response = {
    code: 201,
    message: "Item Created Successfully",
    data: {
      id: newItem.id,
      ...newItem._doc,
      details: { ...itemDetailsCreateService },
      metadata: { ...newMetadata },
    },
    links: {
      self: `/items/${newItem.id}`,
      seller: `/items/${newItem.id}/seller`,
      details: `/item-details/${itemDetailsCreateService.id}`,
      comments: `/item-details/${itemDetailsCreateService.id}/comments`,
    },
  };
  return response;
};

module.exports = create;
