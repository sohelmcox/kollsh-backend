const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  asset_id: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  alternativeText: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  width: {
    type: Number,
    integer: true,
  },
  height: {
    type: Number,
    integer: true,
  },
  folder: {
    type: String,
    required: true,
  },
  resource_type: {
    type: String,
  },
  format: {
    type: String,
  },
  size: {
    type: Number,
    format: "float",
  },
  url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Upload", uploadSchema);
