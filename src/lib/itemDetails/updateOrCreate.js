const { ItemDetails } = require("../../models");

/**
 * Update or create an itemDetail by its ID.
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
 * @returns {Object} - An object containing the updated itemDetail or newly created itemDetail and a status code (201 for creation, 200 for update).
 */
const updateOrCreate = async (
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
    const newItemDetails = await ItemDetails.create({
      item,
      description,
      images,
      contactNumber,
      whatsappNumber,
      email,
      address,
      latitude,
      longitude,
    });
    await newItemDetails.save();
    return {
      data: { ...newItemDetails._doc },
      code: 201,
    };
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

  itemDetails.overwrite(payload);
  await itemDetails.save();

  return { data: { ...itemDetails._doc }, code: 200 };
};
module.exports = updateOrCreate;
