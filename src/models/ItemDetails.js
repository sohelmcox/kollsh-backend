const mongoose = require("mongoose");

const RequiredObjectSchema = new mongoose.Schema(
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
  { timestamps: true }
);

const Image = mongoose.model("Image", mongoose.Schema({}));
const Metaseo = mongoose.model("Metaseo", mongoose.Schema({}));
const RequiredObjectModel = mongoose.model(
  "RequiredObject",
  RequiredObjectSchema
);

module.exports = {
  Image,
  Metaseo,
  RequiredObjectModel,
};
