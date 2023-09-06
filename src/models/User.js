const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
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
    resetPasswordCode: {
      type: String,
    },
    resetPasswordRCodeExpires: {
      type: Date,
      default: null,
    },
    passwordResetAttempts: {
      type: Number,
      default: 0,
    },
    confirmationCode: {
      type: String,
    },
    confirmationCodeExpires: {
      type: Date,
      default: null,
    },
    emailVerificationAttempts: {
      type: Number,
      default: 0,
    },
    confirmed: {
      type: Boolean,
    },
    blocked: {
      type: Boolean,
    },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
