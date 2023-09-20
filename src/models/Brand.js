const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
    },
    description: {
      type: String,
    },
    priority: {
      type: Number,
    },
    attributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
      },
    ],
    metadata: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Metadata",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Brand", BrandSchema);
