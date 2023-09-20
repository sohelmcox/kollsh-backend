const mongoose = require("mongoose");

const AttributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    attribute_values: [
      {
        type: mongoose.Schema.Types.ObjectId,
        example: "string or id",
        ref: "AttributeValue",
      },
    ],
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        example: "string or id",
        ref: "Subcategory",
      },
    ],
    brands: [
      {
        type: mongoose.Schema.Types.ObjectId,
        example: "string or id",
        ref: "Brand",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Attribute", AttributeSchema);
