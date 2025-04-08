const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  jobRole: String,
  description: String,
  skills: String,
  duration: String,
  stipend: String,
  openings: Number,
  entrepreneurEmail: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
