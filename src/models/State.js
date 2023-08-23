const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    priority: {
      type: Number,
    },
    cities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
      },
    ],
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", StateSchema);
