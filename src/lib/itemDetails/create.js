const { ItemDetails } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Create a new itemDetails.
 *
 * @param {Object} itemDetailsData - Data to create a new itemDetails.
 * @param {string} itemDetailsData.name - The name of the itemDetails.
 * @param {string} itemDetailsData.description - The description of the itemDetails.
 * @param {string} itemDetailsData.permission - The permission of the itemDetails.
 * @param {string} itemDetailsData.createdBy - The user who created the itemDetails.
 *
 * @returns {Object} - The newly created itemDetails with additional properties (id).
 */
// TODO: change params
const create = async ({
  item,
  description,
  contactNumber,
  whatsappNumber,
  email,
  address,
  latitude,
  longitude,
  images,
}) => {
  const itemDetailsData = {
    item,
    description,
    contactNumber,
    whatsappNumber,
    email,
    address,
    latitude,
    longitude,
    images,
  };
  const newItemDetails = new ItemDetails(itemDetailsData);

  // Save the new itemDetails to the database
  await newItemDetails.save();

  return { ...newItemDetails._doc, id: newItemDetails.id };
};

module.exports = create;
