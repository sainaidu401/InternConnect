const Application = require('../models/Application');
const Post = require("../models/Post");

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


exports.getApplicationsByEntrepreneur = async (req, res) => {
  try {
    const entrepreneurEmail = req.params.email;

    // Find all posts created by this entrepreneur
    const posts = await Post.find({ entrepreneurEmail });
    const postIds = posts.map(post => post._id);

    // Find applications to those posts
    const applications = await Application.find({ postId: { $in: postIds } });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications", error: err });
  }
};
