const { Item, Comment, Reply, ItemDetails, Metadata } = require("../../models");
/**
 * Destroy (delete) multiple items by their IDs.
 *
 * @param {string[]} itemIds - An array of IDs of the items to be deleted.
 * @returns {number} - The number of deleted items.
 * @throws {Error} - Throws an error if there was an issue while deleting items.
 */
const destroyMany = async (itemIds) => {
  try {
    const items = await Item.findById(itemIds);

    // Collect the IDs of the deleted items
    let deletedItemIds = [];
    if (items && items.length > 0) {
      deletedItemIds = items.map((item) => item._id);
    }
    // Find and delete associated itemDetails
    const itemDetails = await ItemDetails.find({
      item: { $in: deletedItemIds },
    });

    // Find and delete associated comments, replies, and metadata
    const commentIds = [];
    const metadataIds = [];
    for (const itemDetail of itemDetails) {
      const comments = await Comment.find({ itemDetails: itemDetail._id });
      for (const comment of comments) {
        // Collect comment IDs for later deletion
        commentIds.push(comment._id);
        // Find and delete associated replies for each comment
        const replies = await Reply.find({ comment: comment._id });
        await Reply.deleteMany({ comment: comment._id });
      }

      // Collect metadata IDs for later deletion
      if (itemDetail.metadata) {
        metadataIds.push(itemDetail.metadata);
      }
    }

    // Delete comments, metadata, and itemDetails associated with deleted items
    await Comment.deleteMany({ _id: { $in: commentIds } });
    await Metadata.deleteMany({ _id: { $in: metadataIds } });
    const deletedItemDetails = await ItemDetails.deleteMany({
      item: { $in: deletedItemIds },
    });

    const deletedItems = await Item.deleteMany({ _id: { $in: itemIds } });
    // No need to delete itemDetails again since we already deleted them above

    return {
      deletedItems: itemIds.length,
      deletedItemDetails: itemDetails.length,
      deletedComments: commentIds.length,
      deletedMetadata: metadataIds.length,
    };
  } catch (error) {
    throw new Error(`Error deleting items: ${error.message}`);
  }
};

module.exports = destroyMany;
