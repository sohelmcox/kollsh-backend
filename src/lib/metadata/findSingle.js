const { Metadata } = require("../../models");
const { notFound } = require("../../utils/error");

/**
 * Find a single metadata based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the metadata to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The metadata data with populated fields if requested.
 */
const findSingle = async (id) => {
  let metadata = await Metadata.findById(id).exec();
  if (!metadata) {
    throw notFound();
  }

  // return { id: metadata.id, ...metadata._doc };
  return metadata;
};
module.exports = findSingle;
