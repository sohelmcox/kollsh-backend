const mongoose = require("mongoose");

const MetadataSchema = new mongoose.Schema(
  {
    metaDescription: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    metaKeyword: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Metadata", MetadataSchema);
