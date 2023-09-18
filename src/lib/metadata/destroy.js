const { Metadata } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Destroy (delete) an metadata by its ID.
 *
 * @param {string} id - The ID of the metadata to be deleted.
 * @throws {Error} - Throws an error if the metadata with the provided ID is not found.
 */
const destroy = async (id) => {
  const metadata = await Metadata.findById(id);
  if (!metadata) {
    throw notFound("metadata not found.");
  }
  await metadata.deleteOne();
};
module.exports = destroy;
