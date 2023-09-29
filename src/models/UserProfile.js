const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      example: "Jon",
    },
    lastName: {
      type: String,
      example: "doe",
    },
    boi: {
      type: String,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      example: "string or id",
      ref: "Country",
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      example: "string or id",
      ref: "State",
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      example: "string or id",
      ref: "City",
    },
    avatar: {
      type: mongoose.Schema.Types.Mixed,
      example: "string or id",
      ref: "Upload",
    },
    social_link: [
      {
        platform: String,
        link: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);
