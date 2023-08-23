const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },
    confirmationToken: {
      type: String,
    },
    confirmed: {
      type: Boolean,
    },
    blocked: {
      type: Boolean,
    },
    role: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
