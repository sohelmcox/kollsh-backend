const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  controller: {
    type: String,
    required: true,
  },
  actions: [
    {
      type: String,
      required: true,
      default: "read",
    },
  ],
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Permission", permissionSchema);
