const mongoose = require("mongoose");

const ReplaySchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Replay", ReplaySchema);
