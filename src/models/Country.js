const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    flag_image: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Upload",
      },
    ],
    code: {
      type: String,
      required: true,
    },
    // states: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "State",
    //   },
    // ],
  },
  { timestamps: true },
);
CountrySchema.virtual("states", {
  ref: "State",
  foreignField: "country",
  localField: "_id",
  justOne: true,
});
module.exports = mongoose.model("Country", CountrySchema);
