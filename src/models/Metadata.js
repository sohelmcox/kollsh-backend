const mongoose = require("mongoose");

const MetadataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
    },
    keywords: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Metadata", MetadataSchema);
