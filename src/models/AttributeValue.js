const mongoose = require("mongoose");

const AttributeValueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color_code: {
      type: String,
    },
    attribute: [
      {
        type: mongoose.Schema.Types.ObjectId,
        example: "string or id",
        ref: "Attribute",
      },
    ],
    value: {
      type: String,
    },
    brands: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("AttributeValue", AttributeValueSchema);
