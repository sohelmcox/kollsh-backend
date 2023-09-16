const mongoose = require("mongoose");

// Define the main schema using the referenced schemas
const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    // replies: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Reply",
    //   },
    // ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", CommentSchema);
