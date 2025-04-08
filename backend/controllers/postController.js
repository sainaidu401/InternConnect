const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { jobRole, description, skills, duration, stipend, openings } = req.body;
    const newPost = new Post({ jobRole, description, skills, duration, stipend, openings });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
};
