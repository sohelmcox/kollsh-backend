const { model, Schema } = require("mongoose");
const notificationSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unseen",
    },
    slug: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Notification", notificationSchema);
