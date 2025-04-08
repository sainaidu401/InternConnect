const Application = require('../models/Application');
const Post = require("../models/Post");

// 1. Submit Application
exports.submitApplication = async (req, res) => {
  try {
    const { postId, studentEmail } = req.body;

    if (!postId || !studentEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await Application.findOne({ postId, studentEmail });
    if (existing) {
      return res.status(409).json({ message: "You have already applied to this post." });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const application = new Application({
      postId,
      studentEmail,
      entrepreneurEmail: post.entrepreneurEmail,
      jobRole: post.jobRole,
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error("Error submitting application:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 2. Get Applications By Entrepreneur
exports.getApplicationsByEntrepreneur = async (req, res) => {
  try {
    const entrepreneurEmail = req.params.email;
    const posts = await Post.find({ entrepreneurEmail });

    const postIds = posts.map(post => post._id);
    const applications = await Application.find({ postId: { $in: postIds } });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications", error: err.message });
  }
};

// 3. Get Applications By Student
exports.getApplicationsByStudent = async (req, res) => {
  try {
    const studentEmail = req.params.email;

    const applications = await Application.find({ studentEmail }).sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications", error: err.message });
  }
};

// 4. Update Application Status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Status updated", application });
  } catch (err) {
    res.status(500).json({ message: "Error updating status", error: err.message });
  }
};
