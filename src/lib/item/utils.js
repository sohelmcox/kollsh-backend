const { Reply, Comment, ItemDetails, Metadata } = require("../../models");
const { badRequest } = require("../../utils/error");

const DeleteAssociatedDetails = async (id) => {
  try {
    const itemDetails = await ItemDetails.findOne({ item: id });
    if (itemDetails) {
      // Find and delete all associated comments
      const comments = await Comment.find({ itemDetails: itemDetails._id });
      for (const comment of comments) {
        // Find and delete all associated replies for each comment
        await Reply.find({ comment: comment._id });
        await Reply.deleteMany({ comment: comment._id });
        // Delete the comment itself
        await comment.deleteOne();
      }

      // delete associated metadata
      await Metadata.findByIdAndDelete(itemDetails.metadata);

      // Delete associated itemDetails
      await ItemDetails.deleteOne({ item: id });
    }
  } catch (error) {
    throw badRequest(error.message);
  }
};
module.exports = DeleteAssociatedDetails;
