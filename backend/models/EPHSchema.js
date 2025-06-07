const mongoose = require("mongoose");

const EPHSchema = new mongoose.Schema({
  experience: {
    start_date: { type: Date, default: Date.now },
  },
  projectDone: {
    type: Number,
    default: 0,
    required: true,
  },
  client: {
    type: Number,
    default: 0,
    required: true,
  },
});

// Virtual field to calculate live duration
EPHSchema.virtual("duration").get(function () {
  const start = this.experience?.start_date;
  if (!start) return "N/A";

  const now = new Date();
  const diffInMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());

  if (diffInMonths < 12) {
    return `${diffInMonths} months`;
  } else {
    const years = (diffInMonths / 12).toFixed(1);
    return `${years} year`;
  }
});

EPHSchema.set("toJSON", { virtuals: true });

const EPH = mongoose.model("EPH_Bio", EPHSchema);

module.exports = EPH;
