const { Upload } = require("../../models");
const { notFound } = require("../../utils/error");

/**
 * Find a single file based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the file to find.
 * @param {string[]} params.populate - Fields to populate in the result.
 * @returns {Object} - The file data with populated fields if requested.
 */
const findSingle = async (id) => {
  let file = await Upload.findById(id);
  if (!file) {
    throw notFound("file not found");
  }
  return { ...file._doc, id: file.id };
};
module.exports = findSingle;
