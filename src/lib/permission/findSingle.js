const { parsePopulatedFields } = require("../../utils/Query/queryParser");
const { Permission } = require("../../models");
const {
  getSinglePopulatedFields,
} = require("../../utils/Query/getPopulatedFields");
const { notFound } = require("../../utils/error");

/**
 * Find a single permission based on provided ID and populate fields if specified.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.id - The ID of the permission to find.
 * @returns {Object} - The permission data with populated fields if requested.
 */
const findSingle = async (id) => {
  let permission = await Permission.findById(id).exec();
  if (!permission) {
    throw notFound("Permission not Found");
  }
  return { ...permission._doc, id: permission.id };
};
module.exports = findSingle;
