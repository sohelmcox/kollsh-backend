const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
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
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Metadata",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
CategorySchema.virtual("subcategories", {
  ref: "Subcategory",
  foreignField: "category",
  localField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Category", CategorySchema);
