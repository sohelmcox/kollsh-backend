const mongoose = require("mongoose");
const ItemDetails = require("./ItemDetails");

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    released: {
      type: Date,
      required: true,
    },
    thumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
    },

    slug: {
      type: String,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
    cities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    negotiable: {
      type: Boolean,
      default: false,
    },
    is_argent: {
      type: Boolean,
      default: false,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

// Define a virtual field for details
ItemSchema.virtual("details", {
  ref: "ItemDetails",
  localField: "_id",
  foreignField: "item",
});

module.exports = mongoose.model("Item", ItemSchema);
