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
});

module.exports = mongoose.model("City", MainSchema);
