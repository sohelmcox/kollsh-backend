const mongoose = require("mongoose");

const ItemDetailsSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: true,
      },
    ],
    ContactNumber: {
      type: String,
      required: true,
      match: /^\d*$/,
      example: "123456789",
    },
    whatsappNumber: {
      type: String,
      match: /^\d*$/,
      example: "123456789",
    },
    email: {
      type: String,
      format: "email",
    },
    address: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    latitude: {
      type: String,
      match: /^\d*$/,
      example: "123456789",
    },
    longitude: {
      type: String,
      match: /^\d*$/,
      example: "123456789",
    },
    metadata: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MetaData",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ItemDetails", ItemDetailsSchema);
