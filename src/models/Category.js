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
      ref: "Image",
    },
    cover_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    priority: {
      type: Number,
      required: true,
    },
    // subcategories: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Category",
    //   },
    // ],
    featured: {
      type: Boolean,
      default: false,
    },
    // attribute_categories: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "AttributeCategory",
    //   },
    // ],
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
