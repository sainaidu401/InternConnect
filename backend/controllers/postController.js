const Post = require("../models/post");

const createPost = async (req, res) => {
  try {
    const {
      jobRole,
      description,
      skills,
      duration,
      stipend,
      openings,
      entrepreneurEmail, // ✅ must be included
    } = req.body;

    if (!entrepreneurEmail) {
      return res.status(400).json({ message: "Entrepreneur email is required" });
    }

    const newPost = new Post({
      jobRole,
      description,
      skills,
      duration,
      stipend,
      openings,
      entrepreneurEmail,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};
