const { Permission } = require("../../models");
const { notFound } = require("../../utils/error");
/**
 * Edit (update) an permission by its ID.
 *
 * @param {string} id - The ID of the permission to be edited.
 * @param {Object} data - Updated data for the permission.
 * @param {string} data.controller - The updated controller of the permission.
 * @param {string} data.description - The updated description of the permission.
 * @param {string} data.actions - The updated actions of the permission.
 *
 * @returns {Object} - The edited permission with additional properties (id).
 * @throws {Error} - Throws an error if the permission with the provided ID is not found.
 */

const edit = async (id, { controller, description, actions }) => {
  const permission = await Permission.findById(id);
  if (!permission) {
    throw notFound("Permission not found.");
  }

  const payload = {
    controller,
    description,
    actions,
  };

  Object.keys(payload).forEach((key) => {
    permission[key] = payload[key] ?? permission[key];
  });

  await permission.save();
  return { ...permission._doc, id: permission.id };
};

module.exports = edit;
