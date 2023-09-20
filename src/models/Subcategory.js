const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
    },
    cover_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Upload",
    },

    priority: {
      type: Number,
    },
    // items: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Item",
    //   },
    // ],
    is_brand: {
      type: Boolean,
    },
    attributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
      },
    ],
    metadata: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Metadata",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Subcategory", SubcategorySchema);
