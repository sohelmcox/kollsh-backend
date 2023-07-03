const mongoose = require("mongoose");

const MainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
  },
  priority: {
    type: Number,
    required: true,
  },
  item: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("City", MainSchema);
