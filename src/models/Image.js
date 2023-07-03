const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    alternativeText: {
      type: String,
    },
    caption: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    formats: {},
    size: {
      type: Number,
      format: "float",
    },
    url: {
      type: String,
    },
    previewUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
