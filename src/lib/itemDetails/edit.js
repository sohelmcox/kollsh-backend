const { ItemDetails } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an itemDetails by its ID.
 *
 * @param {string} id - The ID of the itemDetail to update. If it doesn't exist, a new itemDetail will be created.
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
 * @returns {Object} - The edited itemDetails with additional properties (id).
 * @throws {Error} - Throws an error if the itemDetails with the provided ID is not found.
 */
const edit = async (
  id,
  {
    item,
    description,
    images,
    contactNumber,
    whatsappNumber,
    email,
    address,
    latitude,
    longitude,
  },
) => {
  const itemDetails = await ItemDetails.findById(id);
  if (!itemDetails) {
    throw notFound("ItemDetails not found.");
  }

  const payload = {
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

  Object.keys(payload).forEach((key) => {
    itemDetails[key] = payload[key] ?? itemDetails[key];
  });

  await itemDetails.save();
  return { ...itemDetails._doc, id: itemDetails.id };
};

module.exports = edit;
