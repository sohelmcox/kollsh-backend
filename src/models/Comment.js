const mongoose = require("mongoose");

// Define the main schema using the referenced schemas
const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
