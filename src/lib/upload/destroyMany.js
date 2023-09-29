const { Upload } = require("../../models");
const { badRequest } = require("../../utils/error");
const { destroyManyFiles } = require("../../utils/upload/cloudinarySDK");
/**
 * Destroy (delete) multiple files by their IDs.
 *
 * @param {string[]} fileIds - An array of IDs of the files to be deleted.
 * @returns {number} - The number of deleted files.
 * @throws {Error} - Throws an error if there was an issue while deleting files.
 */
const destroyMany = async (fileIds) => {
  try {
    if (!Array.isArray(fileIds) || fileIds.length === 0) {
      throw badRequest("Invalid Ids provided");
    }
    const uploadFiles = await Upload.find({ _id: { $in: fileIds } });
    const deletedFilePublicId = uploadFiles.flatMap(
      (uploadFile) => uploadFile.public_id,
    );
    // delete images
    await destroyManyFiles(deletedFilePublicId);

    // delete itemDetails
    const result = await Upload.deleteMany({ _id: { $in: fileIds } });
    const deletedCount = result ? result.deletedCount : 0;

    return deletedCount; // Return the number of deleted files
  } catch (error) {
    throw new Error(`Error deleting files: ${error.message}`);
  }
};
module.exports = destroyMany;
