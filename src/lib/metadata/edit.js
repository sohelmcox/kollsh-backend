const { Metadata } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an metadata by its ID.
 *
 * @param {Object} metadataData - Data to create a new metadata.
 * @param {string} metadataData.title - The title of the metadata.
 * @param {string} metadataData.description - The description of the metadata.
 * @param {string} metadataData.image - The image of the metadata.
 * @param {string} metadataData.keywords - The keywords of the metadata.
 *
 * @returns {Object} - The edited metadata with additional properties (id).
 * @throws {Error} - Throws an error if the metadata with the provided ID is not found.
 */

const edit = async (id, { title, description, image, keywords }) => {
  const metadata = await Metadata.findById(id);
  if (!metadata) {
    throw notFound("Metadata not found.");
  }

  const payload = {
    title,
    description,
    image,
    keywords,
  };

  Object.keys(payload).forEach((key) => {
    metadata[key] = payload[key] ?? metadata[key];
  });

  await metadata.save();
  return { id: metadata.id, ...metadata._doc };
};

module.exports = edit;
