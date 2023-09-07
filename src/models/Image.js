const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  asset_id: String,
  public_id: String,
  alternativeText: {
    type: String,
    required: true,
  },
  caption: String,
  width: {
    type: Number,
    integer: true,
  },
  height: {
    type: Number,
    integer: true,
  },
  folder: String,
  resource_type: String,
  format: String,
  size: {
    type: Number,
    format: "float",
  },
  url: {
    type: String,
    required: true,
  },
  previewUrl: String,
});

module.exports = mongoose.model("Image", imageSchema);
