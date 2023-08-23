const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
  {
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
    },
    social_link: {
      type: mongoose.Schema.Types.ObjectId,
      example: "string or id",
      ref: "SocialLink",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);
