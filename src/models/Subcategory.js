const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema({
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
  image: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  cover_image: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  priority: {
    type: Number,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  is_brand: {
    type: Boolean,
  },
  attributes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
    },
  ],
});

module.exports = mongoose.model("Subcategory", SubcategorySchema);
