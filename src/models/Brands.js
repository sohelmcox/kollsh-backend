const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    cover_image: {
      type: String,
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
        example: "string or id",
        ref: "Attribute",
      },
    ],
    attribute_value: {
      type: mongoose.Schema.Types.Mixed,
      example: "string or id",
      ref: "AttributeValue",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brands", BrandSchema);
