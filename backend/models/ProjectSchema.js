const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  projectLink: {
    type: String,
  },
  started_Date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "pending",
  },
  isclientProject: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("myProject", projectSchema);
