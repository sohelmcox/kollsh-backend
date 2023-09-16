const { ItemDetails } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an itemDetails by its ID.
 *
 * @param {string} id - The ID of the itemDetails to be edited.
 * @param {Object} data - Updated data for the itemDetails.
 * @param {string} data.name - The updated name of the itemDetails.
 * @param {string} data.description - The updated description of the itemDetails.
 * @param {string} data.permission - The updated permission of the itemDetails.
 *
 * @returns {Object} - The edited itemDetails with additional properties (id).
 * @throws {Error} - Throws an error if the itemDetails with the provided ID is not found.
 */
// TODO: update params
const edit = async (
  id,
  {
    item,
    description,
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
