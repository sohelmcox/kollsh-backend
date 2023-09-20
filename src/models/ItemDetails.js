const mongoose = require("mongoose");

const ItemDetailsSchema = new mongoose.Schema(
  {
    item: {
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
        ref: "Upload",
        required: true,
      },
    ],
    contactNumber: {
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
    // comments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Comment",
    //   },
    // ],
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
      ref: "Metadata",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
// Define a virtual field for comments
ItemDetailsSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "itemDetails",
});

// ItemDetailsSchema.pre(/^find/, function (next) {
//   // ^find here is we use regex and can able to find,findOne ...etc
//   this.populate({
//     path: "item",
//     select: " _id name",
//   });
//   next();
// });

module.exports = mongoose.model("ItemDetails", ItemDetailsSchema);
