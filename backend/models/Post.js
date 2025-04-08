const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  jobRole: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: String, required: true },
  duration: { type: String, required: true },
  stipend: { type: String, required: true },
  openings: { type: Number, required: true },
  entrepreneurEmail: { type: String, required: true },
});

module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
