const Application = require('../models/Application');

exports.submitApplication = async (req, res) => {
  try {
    const { postId, studentEmail } = req.body;

    if (!postId || !studentEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Prevent duplicate applications
    const existing = await Application.findOne({ postId, studentEmail });
    if (existing) {
      return res.status(409).json({ message: "You have already applied to this post." });
    }

    const application = new Application({ postId, studentEmail });
    await application.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error("Error submitting application:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
