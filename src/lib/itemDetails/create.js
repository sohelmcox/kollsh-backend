const { ItemDetails } = require("../../models");
const { badRequest } = require("../../utils/error");

/**
 * Create a new itemDetails.
 *
 * @param {Object} data - Updated data for the itemDetail.
 * @param {string} data.item - The updated item of the itemDetail.
 * @param {string} data.description - The updated description of the itemDetail.
 * @param {string} data.images - The updated images of the itemDetail.
 * @param {string} data.contactNumber - The updated contactNumber of the itemDetail.
 * @param {string} data.whatsappNumber - The updated whatsappNumber of the itemDetail.
 * @param {string} data.email - The updated email of the itemDetail.
 * @param {string} data.address - The updated address of the itemDetail.
 * @param {string} data.latitude - The updated latitude of the itemDetail.
 * @param {string} data.longitude - The updated longitude of the itemDetail.
 *
 * @returns {Object} - The newly created itemDetails with additional properties (id).
 */
const create = async ({
  item,
  description,
  images,
  contactNumber,
  whatsappNumber,
  email,
  address,
  latitude,
  longitude,
}) => {
  const itemDetailsData = {
    item,
    description,
    images,
    contactNumber,
    whatsappNumber,
    email,
    address,
    latitude,
    longitude,
  };
  const newItemDetails = new ItemDetails(itemDetailsData);

  // Save the new itemDetails to the database
  await newItemDetails.save();

  return { id: newItemDetails.id, ...newItemDetails._doc };
};

module.exports = create;
