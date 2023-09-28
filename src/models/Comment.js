const mongoose = require("mongoose");
const Reply = require("./Reply");

// Define the main schema using the referenced schemas
const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    itemDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItemDetails",
      required: true,
    },
    // replies: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Reply",
    //   },
    // ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
CommentSchema.virtual("replies", {
  ref: "Reply",
  foreignField: "comment",
  localField: "_id",
  justOne: true,
});

// CommentSchema.pre(/^find/, function (next) {
//   // ^find here is we use regex and can able to find,findOne ...etc
//   this.populate({
//     path: "itemDetails",
//     select: " _id title",
//   });
//   next();
// });

module.exports = mongoose.model("Comment", CommentSchema);
