const { ItemDetails } = require("../../models");

/**
 * Update or create an itemDetail by its ID.
 *
 * @param {string} id - The ID of the itemDetail to update. If it doesn't exist, a new itemDetail will be created.
 * @param {Object} data - Updated data for the itemDetail.
 * @param {string} data.name - The updated name of the itemDetail.
 * @param {string} data.description - The updated description of the itemDetail.
 * @param {string} data.permission - The updated permission of the itemDetail.
 * @param {string} data.createdBy - The updated createdBy of the itemDetail.
 *
 * @returns {Object} - An object containing the updated itemDetail or newly created itemDetail and a status code (201 for creation, 200 for update).
 */
// TODO: update Params
const updateOrCreate = async (
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
    images,
  },
) => {
  const itemDetails = await ItemDetails.findById(id);
  if (!itemDetails) {
    const newItemDetails = await ItemDetails.create({
      item,
      description,
      contactNumber,
      whatsappNumber,
      email,
      address,
      latitude,
      longitude,
      images,
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
    contactNumber,
    whatsappNumber,
    email,
    address,
    latitude,
    longitude,
    images,
  };

  itemDetails.overwrite(payload);
  await itemDetails.save();

  return { data: { ...itemDetails._doc }, code: 200 };
};
module.exports = updateOrCreate;
