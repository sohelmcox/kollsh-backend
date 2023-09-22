const { Metadata } = require("../../models");

/**
 * Create a new metadata.
 *
 * @param {Object} metadataData - Data to create a new metadata.
 * @param {string} metadataData.title - The title of the metadata.
 * @param {string} metadataData.description - The description of the metadata.
 * @param {string} metadataData.image - The image of the metadata.
 * @param {string} metadataData.keywords - The keywords of the metadata.
 *
 * @returns {Object} - The newly created metadata with additional properties (id).
 */
const create = async ({ title, description, image, keywords }) => {
  const metadataData = {
    title,
    description,
    image,
    keywords,
  };
  const newMetadata = await Metadata.create(metadataData);

  return { id: newMetadata._id, ...newMetadata._doc, code: 201 };
};

module.exports = create;
