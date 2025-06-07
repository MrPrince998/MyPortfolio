const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  icon: {
    library: { type: String, required: true },
    name: { type: String, required: true },
  },
  title: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

module.exports = mongoose.model("skills", SkillSchema);
